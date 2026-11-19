"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { disciplines } from "@/lib/content";
import { addisTime } from "@/lib/format";
import { useDesk } from "@/lib/store";

const links = [
  { href: "/work", label: "Work" },
  { href: "/clients", label: "Clients" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/career", label: "Career" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { authed } = useDesk();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTimer = useRef<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [bar, setBar] = useState({ x: 0, w: 0 });
  const track = useRef<HTMLElement>(null);
  const servicesActive = pathname === "/practice";

  function moveBar(node: HTMLElement | null) {
    const root = track.current;
    if (!root || !node) {
      setBar({ x: 0, w: 0 });
      return;
    }
    const from = root.getBoundingClientRect();
    const to = node.getBoundingClientRect();
    setBar({ x: to.left - from.left, w: to.width });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => setTime(addisTime());
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  function showServices() {
    if (servicesTimer.current) window.clearTimeout(servicesTimer.current);
    setServicesOpen(true);
  }

  function hideServices() {
    if (servicesTimer.current) window.clearTimeout(servicesTimer.current);
    servicesTimer.current = window.setTimeout(() => setServicesOpen(false), 220);
  }

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    const current = track.current?.querySelector<HTMLElement>("[data-current='true']");
    moveBar(current ?? null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open && !servicesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, servicesOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 bg-green text-ivory transition-shadow duration-300 ${scrolled ? "shadow-[0_16px_40px_rgba(8,22,14,0.35)]" : ""}`}>
      <div className="mx-auto flex h-24 max-w-[90rem] items-center justify-between gap-8 px-5 md:px-12">
        <Link href="/" className="block shrink-0" aria-label="Damakese, home">
          <Logo ink="#F6F7F3" className="h-14 w-auto md:h-16" />
        </Link>
        <nav
          ref={track}
          className="relative hidden items-center gap-7 lg:flex xl:gap-9"
          aria-label="Primary"
          onMouseLeave={() => moveBar(track.current?.querySelector<HTMLElement>("[data-current='true']") ?? null)}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 h-[3px] bg-lime transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,1.2,0.36,1)]"
            style={{ width: bar.w, transform: `translateX(${bar.x}px)` }}
          />
          <Link
            href="/about"
            data-current={pathname === "/about" ? "true" : undefined}
            aria-current={pathname === "/about" ? "page" : undefined}
            onMouseEnter={(event) => moveBar(event.currentTarget)}
            className="ui py-3 text-lg font-semibold tracking-tight hover:text-lime"
          >
            About
          </Link>
          <div
            className="relative"
            onMouseEnter={showServices}
            onMouseLeave={hideServices}
            onFocus={showServices}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) hideServices();
            }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              aria-controls="services-menu"
              onClick={showServices}
              data-current={servicesActive ? "true" : undefined}
              onMouseEnter={(event) => moveBar(event.currentTarget)}
              className="ui inline-flex cursor-pointer items-center gap-1.5 py-3 text-lg font-semibold tracking-tight hover:text-lime"
            >
              Services
              <CaretDown size={16} className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen ? (
              <div className="absolute top-full left-1/2 z-50 w-80 -translate-x-1/2 pt-3">
                <ul id="services-menu" className="border border-lime/40 bg-green p-2 text-ivory shadow-[0_18px_40px_rgba(8,22,14,0.35)]">
                  {disciplines.map((item) => (
                    <li key={item.id}>
                      <Link href={`/practice#${item.id}`} className="block px-3 py-3 hover:bg-forest">
                        <span className="ui block text-xs tracking-[0.14em] text-lime uppercase">{item.index}</span>
                        <span className="mt-1 block text-base font-medium">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-forest">
                    <Link href="/practice" className="ui block px-3 py-3 text-base font-medium hover:bg-forest">
                      All services
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
          {links.map((link) => {
            const active = link.href === "/career" ? pathname.startsWith("/career") : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                data-current={active ? "true" : undefined}
                onMouseEnter={(event) => moveBar(event.currentTarget)}
                className="ui py-3 text-lg font-semibold tracking-tight hover:text-lime"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <p className="ui hidden text-sm tracking-[0.14em] text-ivory/75 uppercase xl:block">
            {time ? `${time} Addis Ababa` : "Addis Ababa"}
          </p>
          {authed ? (
            <Link href="/admin" className="btn btn-ghost hidden text-ivory sm:inline-flex">
              My dashboard
            </Link>
          ) : null}
          <Link href="/inquire" className="btn hidden bg-lime text-green hover:bg-ivory sm:inline-flex">
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <List size={22} />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-forest bg-green px-5 py-6 text-ivory lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            <li className="border-b border-forest">
              <Link href="/about" className="ui flex min-h-14 items-center text-xl font-semibold">
                About
              </Link>
            </li>
            <li className="border-b border-forest py-3">
              <p className="ui text-xs tracking-[0.14em] text-lime uppercase">Services</p>
              <ul className="mt-2">
                {disciplines.map((item) => (
                  <li key={item.id}>
                    <Link href={`/practice#${item.id}`} className="flex min-h-12 items-center text-lg">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {links.map((link) => (
              <li key={link.href} className="border-b border-forest">
                <Link href={link.href} className="ui flex min-h-14 items-center text-xl font-semibold">
                  {link.label}
                </Link>
              </li>
            ))}
            {authed ? (
              <li className="border-b border-forest">
                <Link href="/admin" className="ui flex min-h-14 items-center text-xl font-semibold">
                  My dashboard
                </Link>
              </li>
            ) : null}
          </ul>
          <Link href="/inquire" className="btn mt-6 w-full bg-lime text-green hover:bg-ivory">
            Let&apos;s talk
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
