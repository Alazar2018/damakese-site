"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Kind } from "@/lib/content";

export type EventStatus = "planning" | "confirmed" | "on-site" | "delivered" | "hold";
export type InquiryStatus = "new" | "review" | "briefed" | "closed";
export type SeatRole = "owner" | "desk";

export type Seat = {
  id: string;
  email: string;
  name: string;
  role: SeatRole;
};

export type DayPicture = {
  id: string;
  src: string;
  alt: string;
};

export type StudioEvent = {
  id: string;
  name: string;
  kind: Kind;
  client: string;
  venue: string;
  date: string;
  doors: string;
  status: EventStatus;
  visibility: "public" | "internal";
  crew: number;
  note: string;
  image: string;
  imageAlt: string;
  images: DayPicture[];
};

export type Inquiry = {
  id: string;
  name: string;
  organisation: string;
  email: string;
  phone: string;
  kind: Kind;
  date: string;
  city: string;
  brief: string;
  status: InquiryStatus;
  receivedAt: string;
};

export type Client = {
  id: string;
  organisation: string;
  contact: string;
  email: string;
  note: string;
};

export type RunItem = {
  id: string;
  eventId: string;
  time: string;
  task: string;
  owner: string;
  state: "open" | "done" | "blocked";
};

type DeskData = {
  events: StudioEvent[];
  inquiries: Inquiry[];
  clients: Client[];
  run: RunItem[];
};

const empty: DeskData = { events: [], inquiries: [], clients: [], run: [] };
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const STORAGE = "damakese-desk-v2";
const LEGACY = "damakese-desk-v1";

type Desk = {
  ready: boolean;
  authed: boolean;
  role: SeatRole | null;
  seatName: string;
  legacyBook: boolean;
  events: StudioEvent[];
  inquiries: Inquiry[];
  clients: Client[];
  run: RunItem[];
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  importLegacy: () => Promise<void>;
  addInquiry: (entry: Omit<Inquiry, "id" | "status" | "receivedAt">) => Promise<void>;
  setInquiryStatus: (id: string, status: InquiryStatus) => Promise<void>;
  saveEvent: (event: StudioEvent) => Promise<void>;
  addEvent: (event: Omit<StudioEvent, "id">) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  saveInquiry: (inquiry: Inquiry) => Promise<void>;
  removeInquiry: (id: string) => Promise<void>;
  saveClient: (client: Client) => Promise<void>;
  addClient: (client: Omit<Client, "id">) => Promise<void>;
  removeClient: (id: string) => Promise<void>;
  addRun: (item: Omit<RunItem, "id">) => Promise<void>;
  saveRun: (item: RunItem) => Promise<void>;
  removeRun: (id: string) => Promise<void>;
  setRunState: (id: string, state: RunItem["state"]) => Promise<void>;
};

const DeskContext = createContext<Desk | null>(null);

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string | string[] };
    const message = Array.isArray(body.message) ? body.message[0] : body.message;
    throw new Error(message || "The desk could not save that.");
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

function dress(event: StudioEvent): StudioEvent {
  const images = event.images?.length
    ? event.images
    : event.image
      ? [{ id: `cover-${event.id}`, src: event.image, alt: event.imageAlt }]
      : [];
  return {
    ...event,
    images,
    image: images[0]?.src ?? "",
    imageAlt: images[0]?.alt ?? "",
  };
}

function dressBook(book: DeskData): DeskData {
  return { ...book, events: book.events.map(dress) };
}

async function syncPictures(saved: StudioEvent, wanted: DayPicture[]) {
  let current = dress(saved);
  const kept = new Set(wanted.filter((picture) => picture.src.startsWith("http")).map((picture) => picture.id));
  for (const picture of current.images) {
    if (!kept.has(picture.id)) {
      current = dress(await call<StudioEvent>(`/days/${saved.id}/photos/${picture.id}`, { method: "DELETE" }));
    }
  }
  for (const picture of wanted) {
    const previous = current.images.find((item) => item.id === picture.id);
    if (picture.src.startsWith("http") && previous && previous.alt !== picture.alt) {
      current = dress(
        await call<StudioEvent>(`/days/${saved.id}/photos/${picture.id}`, {
          method: "PATCH",
          body: JSON.stringify({ alt: picture.alt }),
        }),
      );
    }
  }
  for (const picture of wanted) {
    if (!picture.src.startsWith("data:")) continue;
    const blob = await (await fetch(picture.src)).blob();
    const body = new FormData();
    body.append("file", blob, "day.jpg");
    body.append("alt", picture.alt);
    current = dress(await call<StudioEvent>(`/days/${saved.id}/photo`, { method: "POST", body }));
  }
  return current;
}

export function DeskProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DeskData>(empty);
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState<SeatRole | null>(null);
  const [seatName, setSeatName] = useState("");
  const [legacyBook, setLegacyBook] = useState(false);

  const applySeat = useCallback((seat: Seat | null) => {
    setAuthed(Boolean(seat));
    setRole(seat?.role ?? null);
    setSeatName(seat?.name ?? "");
  }, []);

  const loadPublic = useCallback(async () => {
    const days = await call<{ events: StudioEvent[] }>("/days");
    setData({ ...empty, events: days.events.map(dress) });
  }, []);

  const loadDesk = useCallback(async () => {
    setData(dressBook(await call<DeskData>("/desk")));
  }, []);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const me = await call<{ user: Seat | null }>("/auth/me");
        if (!live) return;
        if (me.user) {
          applySeat(me.user);
          const book = await call<DeskData>("/desk");
          if (!live) return;
          setData(dressBook(book));
        } else {
          const days = await call<{ events: StudioEvent[] }>("/days");
          if (!live) return;
          setData({ ...empty, events: days.events.map(dress) });
        }
      } catch {
        if (!live) return;
        setData(empty);
      }
      try {
        setLegacyBook(Boolean(localStorage.getItem(STORAGE) || localStorage.getItem(LEGACY)));
      } catch {
        /* this browser is keeping its storage to itself */
      }
      if (live) setReady(true);
    })();
    return () => {
      live = false;
    };
  }, [applySeat]);

  const api = useMemo<Desk>(() => {
    return {
      ready,
      authed,
      role,
      seatName,
      legacyBook,
      events: data.events,
      inquiries: data.inquiries,
      clients: data.clients,
      run: data.run,
      signIn: async (email, password) => {
        try {
          const result = await call<{ user: Seat }>("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
          });
          applySeat(result.user);
          await loadDesk();
          return true;
        } catch {
          return false;
        }
      },
      signOut: async () => {
        await call("/auth/logout", { method: "POST" }).catch(() => undefined);
        applySeat(null);
        await loadPublic().catch(() => setData(empty));
      },
      importLegacy: async () => {
        const raw = localStorage.getItem(STORAGE) ?? localStorage.getItem(LEGACY);
        if (!raw) return;
        const book = dressBook(await call<DeskData>("/import", { method: "POST", body: raw }));
        localStorage.removeItem(STORAGE);
        localStorage.removeItem(LEGACY);
        sessionStorage.removeItem("damakese-desk-session");
        setLegacyBook(false);
        setData(book);
      },
      addInquiry: async (entry) => {
        const brief = await call<Inquiry>("/briefs", { method: "POST", body: JSON.stringify(entry) });
        setData((current) => ({
          ...current,
          inquiries: [brief, ...current.inquiries.filter((item) => item.id !== brief.id)],
        }));
      },
      setInquiryStatus: async (id, status) => {
        const current = data.inquiries.find((item) => item.id === id);
        if (!current) return;
        const saved = await call<Inquiry>(`/briefs/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ ...current, status }),
        });
        setData((book) => ({
          ...book,
          inquiries: book.inquiries.map((item) => (item.id === id ? saved : item)),
        }));
      },
      saveEvent: async (event) => {
        const pictures = event.images ?? [];
        const cover = pictures.find((picture) => picture.src.startsWith("http"));
        const saved = await call<StudioEvent>(`/days/${event.id}`, {
          method: "PATCH",
          body: JSON.stringify({ ...event, image: cover?.src ?? "", imageAlt: cover?.alt ?? event.imageAlt }),
        });
        const next = await syncPictures(saved, pictures);
        setData((book) => ({
          ...book,
          events: book.events.map((item) => (item.id === event.id ? next : item)),
        }));
      },
      addEvent: async (event) => {
        const pictures = event.images ?? [];
        const cover = pictures.find((picture) => picture.src.startsWith("http"));
        const created = await call<StudioEvent>("/days", {
          method: "POST",
          body: JSON.stringify({ ...event, image: cover?.src ?? "", imageAlt: cover?.alt ?? "" }),
        });
        const saved = await syncPictures(created, pictures);
        setData((book) => ({ ...book, events: [saved, ...book.events.filter((item) => item.id !== saved.id)] }));
      },
      removeEvent: async (id) => {
        await call(`/days/${id}`, { method: "DELETE" });
        setData((book) => ({
          ...book,
          events: book.events.filter((item) => item.id !== id),
          run: book.run.filter((item) => item.eventId !== id),
        }));
      },
      saveInquiry: async (inquiry) => {
        const saved = await call<Inquiry>(`/briefs/${inquiry.id}`, {
          method: "PATCH",
          body: JSON.stringify(inquiry),
        });
        setData((book) => ({
          ...book,
          inquiries: book.inquiries.map((item) => (item.id === inquiry.id ? saved : item)),
        }));
      },
      removeInquiry: async (id) => {
        await call(`/briefs/${id}`, { method: "DELETE" });
        setData((book) => ({ ...book, inquiries: book.inquiries.filter((item) => item.id !== id) }));
      },
      saveClient: async (client) => {
        const saved = await call<Client>(`/clients/${client.id}`, {
          method: "PATCH",
          body: JSON.stringify(client),
        });
        setData((book) => ({
          ...book,
          clients: book.clients.map((item) => (item.id === client.id ? saved : item)),
        }));
      },
      addClient: async (client) => {
        const saved = await call<Client>("/clients", { method: "POST", body: JSON.stringify(client) });
        setData((book) => ({ ...book, clients: [saved, ...book.clients] }));
      },
      removeClient: async (id) => {
        await call(`/clients/${id}`, { method: "DELETE" });
        setData((book) => ({ ...book, clients: book.clients.filter((item) => item.id !== id) }));
      },
      addRun: async (item) => {
        const saved = await call<RunItem>("/run", { method: "POST", body: JSON.stringify(item) });
        setData((book) => ({ ...book, run: [...book.run, saved] }));
      },
      saveRun: async (item) => {
        const saved = await call<RunItem>(`/run/${item.id}`, { method: "PATCH", body: JSON.stringify(item) });
        setData((book) => ({ ...book, run: book.run.map((row) => (row.id === item.id ? saved : row)) }));
      },
      removeRun: async (id) => {
        await call(`/run/${id}`, { method: "DELETE" });
        setData((book) => ({ ...book, run: book.run.filter((row) => row.id !== id) }));
      },
      setRunState: async (id, state) => {
        const current = data.run.find((item) => item.id === id);
        if (!current) return;
        const saved = await call<RunItem>(`/run/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ ...current, state }),
        });
        setData((book) => ({ ...book, run: book.run.map((item) => (item.id === id ? saved : item)) }));
      },
    };
  }, [applySeat, authed, data, legacyBook, loadDesk, loadPublic, ready, role, seatName]);

  return <DeskContext.Provider value={api}>{children}</DeskContext.Provider>;
}

export function useDesk() {
  const value = useContext(DeskContext);
  if (!value) throw new Error("useDesk must be used inside DeskProvider");
  return value;
}
