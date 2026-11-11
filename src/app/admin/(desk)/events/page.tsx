"use client";

import { FormEvent, useMemo, useState } from "react";
import { ImageField } from "@/components/image-field";
import { Modal } from "@/components/modal";
import { KINDS, type Kind } from "@/lib/content";
import { formatDay, statusLabel } from "@/lib/format";
import { frameFor } from "@/lib/photos";
import { useDesk, type EventStatus, type StudioEvent } from "@/lib/store";

const statuses: EventStatus[] = ["planning", "confirmed", "on-site", "delivered", "hold"];

function emptyDay(): StudioEvent {
  return {
    id: "",
    name: "",
    kind: "Conference",
    client: "",
    venue: "Addis Ababa",
    date: "",
    doors: "18:00",
    status: "planning",
    visibility: "internal",
    crew: 12,
    note: "",
    image: "",
    imageAlt: "",
    images: [],
  };
}

export default function EventsPage() {
  const { events, saveEvent, addEvent, removeEvent, role } = useDesk();
  const [draft, setDraft] = useState<StudioEvent | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const book = useMemo(() => events.slice().sort((a, b) => a.date.localeCompare(b.date)), [events]);

  function openNew() {
    setDraft(emptyDay());
    setConfirm(false);
    setError("");
  }

  function openEdit(item: StudioEvent) {
    setDraft({ ...item });
    setConfirm(false);
    setError("");
  }

  function close() {
    setDraft(null);
    setConfirm(false);
    setError("");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    if (draft.name.trim().length < 2 || !draft.date) {
      setError("A day needs a name and a date.");
      return;
    }
    const images = draft.images.length
      ? draft.images
      : [
          {
            id: "stock",
            src: frameFor(draft.id, draft.kind),
            alt: `${draft.name}, ${draft.venue}.`,
          },
        ];
    const next = {
      ...draft,
      crew: Number(draft.crew) || 0,
      images,
      image: images[0]?.src ?? "",
      imageAlt: images[0]?.alt ?? "",
    };
    try {
      if (draft.id) await saveEvent(next);
      else {
        const { id: _id, ...rest } = next;
        await addEvent(rest);
      }
      setNotice("The book is updated.");
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "The day could not be saved.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Days</p>
          <h1 className="display mt-3 text-4xl text-green">The book.</h1>
        </div>
        <button type="button" className="btn btn-solid" onClick={openNew}>
          Add a day
        </button>
      </div>
      <p className="mt-3 max-w-[var(--measure)]">Public days appear on the site. Internal days stay on this desk.</p>
      {notice ? <p className="mt-4 text-forest">{notice}</p> : null}

      <ul className="mt-8 grid gap-4 md:hidden">
        {book.map((item) => (
          <li key={item.id} className="bg-sand">
            {item.image ? <img src={item.image} alt="" className="aspect-[16/9] w-full object-cover" /> : null}
            <div className="p-5">
              <p className="text-2xl text-green italic">{item.name}</p>
              <p className="mt-2 text-sm">
                {item.client} · {item.kind}
              </p>
              <p className="ui mt-3 text-sm text-forest">
                {formatDay(item.date)} · Doors {item.doors} · {statusLabel[item.status]} · {item.visibility === "public" ? "Public" : "Internal"}
              </p>
              <button type="button" className="btn btn-solid mt-4" onClick={() => openEdit(item)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="table-wrap mt-8 hidden md:block">
        <table className="data">
          <thead>
            <tr>
              <th>Day</th>
              <th>When</th>
              <th>Status</th>
              <th>Book</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {book.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center gap-3">
                    {item.image ? <img src={item.image} alt="" className="h-14 w-20 object-cover" /> : null}
                    <div>
                      <p className="text-green italic">{item.name}</p>
                      <p className="text-sm">
                        {item.client} · {item.kind}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  {formatDay(item.date)}
                  <span className="block text-sm">Doors {item.doors}</span>
                </td>
                <td>{statusLabel[item.status]}</td>
                <td>{item.visibility === "public" ? "Public" : "Internal"}</td>
                <td>
                  <button type="button" className="btn btn-solid" onClick={() => openEdit(item)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={draft !== null} title={draft?.id ? "Edit the day" : "Add a day"} onClose={close}>
        {draft && confirm ? (
          <div>
            <p>Remove “{draft.name}” from the book? The run sheet for that day goes with it.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="btn btn-solid"
                onClick={() => {
                  void removeEvent(draft.id)
                    .then(() => {
                      setNotice("The day is off the book.");
                      close();
                    })
                    .catch((err: unknown) => {
                      setConfirm(false);
                      setError(err instanceof Error ? err.message : "The day could not be removed.");
                    });
                }}
              >
                Remove the day
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirm(false)}>
                Keep it
              </button>
            </div>
          </div>
        ) : draft ? (
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <ImageField
              pictures={draft.images}
              onChange={(images) =>
                setDraft({
                  ...draft,
                  images,
                  image: images[0]?.src ?? "",
                  imageAlt: images[0]?.alt ?? "",
                })
              }
            />
            <label className="field">
              <span>Name</span>
              <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            </label>
            <label className="field">
              <span>Client</span>
              <input value={draft.client} onChange={(event) => setDraft({ ...draft, client: event.target.value })} />
            </label>
            <label className="field">
              <span>Kind</span>
              <select value={draft.kind} onChange={(event) => setDraft({ ...draft, kind: event.target.value as Kind })}>
                {KINDS.map((kind) => (
                  <option key={kind}>{kind}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Date</span>
              <input type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} />
            </label>
            <label className="field">
              <span>Doors</span>
              <input type="time" value={draft.doors} onChange={(event) => setDraft({ ...draft, doors: event.target.value })} />
            </label>
            <label className="field">
              <span>Venue</span>
              <input value={draft.venue} onChange={(event) => setDraft({ ...draft, venue: event.target.value })} />
            </label>
            <label className="field">
              <span>Status</span>
              <select
                value={draft.status}
                onChange={(event) => setDraft({ ...draft, status: event.target.value as EventStatus })}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabel[status]}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Book</span>
              <select
                value={draft.visibility}
                onChange={(event) => setDraft({ ...draft, visibility: event.target.value as StudioEvent["visibility"] })}
              >
                <option value="internal">Internal</option>
                <option value="public">Public</option>
              </select>
            </label>
            <label className="field">
              <span>Crew</span>
              <input
                type="number"
                min={0}
                value={draft.crew}
                onChange={(event) => setDraft({ ...draft, crew: Number(event.target.value) })}
              />
            </label>
            <label className="field md:col-span-2">
              <span>The line the day has to keep</span>
              <textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} />
            </label>
            {error ? <p className="text-wine md:col-span-2">{error}</p> : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-2">
              <button type="submit" className="btn btn-solid">
                {draft.id ? "Save the day" : "Add the day"}
              </button>
              {draft.id && role === "owner" ? (
                <button type="button" className="ui min-h-11 cursor-pointer text-sm text-wine" onClick={() => setConfirm(true)}>
                  Remove this day
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  );
}
