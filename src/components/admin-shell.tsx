"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  Buildings,
  CalendarBlank,
  EnvelopeSimple,
  ListChecks,
  SquaresFour,
} from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { useDesk } from "@/lib/store";

const links = [
  { href: "/admin", label: "Desk", icon: SquaresFour },
  { href: "/admin/events", label: "Days", icon: CalendarBlank },
  { href: "/admin/inquiries", label: "Briefs", icon: EnvelopeSimple },
  { href: "/admin/clients", label: "Clients", icon: Buildings },
  { href: "/admin/run-sheet", label: "Run sheet", icon: ListChecks },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, authed, signOut, role, seatName, legacyBook, importLegacy } = useDesk();

  useEffect(() => {
    if (ready && !authed) router.replace("/admin/login");
  }, [ready, authed, router]);

  if (!ready || !authed) {
    return <div className="min-h-screen bg-ivory" />;
  }

  return (
    <div className="min-h-screen bg-ivory text-ink md:pl-[16.5rem]">
      <aside className="on-green sticky top-0 z-30 flex flex-col bg-green text-ivory md:fixed md:inset-y-0 md:left-0 md:h-dvh md:w-[16.5rem]">
        <div className="shrink-0 px-5 pt-6">
          <Link href="/" aria-label="Damakese site" className="inline-flex w-fit">
            <Logo ink="#F6F7F3" className="h-auto w-36" />
          </Link>
          <p className="eyebrow mt-6">Studio desk</p>
        </div>
        <nav className="mt-6 flex gap-2 overflow-x-auto px-3 pb-4 md:min-h-0 md:flex-1 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:px-3" aria-label="Desk">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`ui flex min-h-11 shrink-0 items-center gap-3 px-3 text-sm font-medium ${
                  active ? "bg-ivory text-green" : "text-ivory hover:bg-white/10"
                }`}
              >
                <Icon size={18} weight="regular" />
                {link.label}
                {active ? <span aria-hidden className="ml-auto h-1.5 w-1.5 bg-lime" /> : null}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="ui m-3 min-h-11 shrink-0 px-3 text-left text-sm"
          onClick={() => {
            void signOut().then(() => router.push("/admin/login"));
          }}
        >
          Leave the desk
        </button>
      </aside>
      <div className="min-w-0 px-5 py-8 md:px-10 md:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="ui text-xs tracking-[0.14em] uppercase text-forest">
            {seatName} · {role === "owner" ? "Owner" : "Desk"}
          </p>
          {legacyBook && role === "owner" ? (
            <button type="button" className="btn btn-solid" onClick={() => void importLegacy()}>
              Bring this browser’s book
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
