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
  const heroRoute = ["/", "/work", "/practice", "/about", "/inquire", "/clients", "/newsroom", "/career"].includes(pathname);
  const solid = scrolled || open;
  const overHero = heroRoute && !solid;
  const servicesActive = pathname === "/practice";
  const mark = overHero ? "decoration-lime" : "decoration-green";

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
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-ivory text-green transition-colors duration-300 ${
        overHero ? "on-green lg:bg-transparent lg:text-ivory" : ""
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-6 px-5 md:px-12">
        <Link href="/" className="block shrink-0" aria-label="Damakese, home">
          <Logo ink="#12341D" className={`h-11 w-auto md:h-14 ${overHero ? "lg:hidden" : ""}`} />
          {overHero ? <Logo ink="#F6F7F3" className="hidden h-11 w-auto md:h-14 lg:block" /> : null}
        </Link>
        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label="Primary">
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={`ui text-[0.8rem] font-medium xl:text-sm ${pathname === "/about" ? `underline decoration-2 underline-offset-8 ${mark}` : ""}`}
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
              className={`ui inline-flex cursor-pointer items-center gap-1 text-[0.8rem] font-medium xl:text-sm ${
                servicesActive ? `underline decoration-2 underline-offset-8 ${mark}` : ""
              }`}
            >
              Services
              <CaretDown size={12} className={servicesOpen ? "rotate-180" : ""} />
            </button>
            {servicesOpen ? (
              <div className="absolute top-full left-1/2 z-50 w-80 -translate-x-1/2 pt-3">
                <ul id="services-menu" className="border border-stone bg-ivory p-2 text-green">
                  {disciplines.map((item) => (
                    <li key={item.id}>
                      <Link href={`/practice#${item.id}`} className="block px-3 py-3 hover:bg-sand">
                        <span className="ui block text-xs tracking-[0.14em] text-forest uppercase">{item.index}</span>
                        <span className="mt-1 block text-sm font-medium">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-stone">
                    <Link href="/practice" className="ui block px-3 py-3 text-sm font-medium hover:bg-sand">
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
                className={`ui text-[0.8rem] font-medium xl:text-sm ${active ? `underline decoration-2 underline-offset-8 ${mark}` : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <p className="ui hidden text-xs tracking-[0.14em] uppercase opacity-80 xl:block">
            {time ? `${time} Addis Ababa` : "Addis Ababa"}
          </p>
          {authed ? (
            <Link href="/admin" className="btn btn-ghost hidden sm:inline-flex">
              My dashboard
            </Link>
          ) : null}
          {overHero ? (
            <style>{`@media (max-width:39.99rem){.talk-hero{display:none}}@media (min-width:64rem){.talk-hero{background:#f6f7f3;color:#12341d}.talk-hero:hover{background:#fff}}`}</style>
          ) : null}
          <Link href="/inquire" className={overHero ? "btn btn-solid talk-hero" : "btn btn-solid hidden sm:inline-flex"}>
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
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-stone bg-ivory px-5 py-6 text-green lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            <li className="border-b border-stone">
              <Link href="/about" className="ui flex min-h-12 items-center text-lg font-medium">
                About
              </Link>
            </li>
            <li className="border-b border-stone py-3">
              <p className="ui text-xs tracking-[0.14em] text-forest uppercase">Services</p>
              <ul className="mt-2">
                {disciplines.map((item) => (
                  <li key={item.id}>
                    <Link href={`/practice#${item.id}`} className="flex min-h-11 items-center text-base">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {links.map((link) => (
              <li key={link.href} className="border-b border-stone">
                <Link href={link.href} className="ui flex min-h-12 items-center text-lg font-medium">
                  {link.label}
                </Link>
              </li>
            ))}
            {authed ? (
              <li className="border-b border-stone">
                <Link href="/admin" className="ui flex min-h-12 items-center text-lg font-medium">
                  My dashboard
                </Link>
              </li>
            ) : null}
          </ul>
          <Link href="/inquire" className="btn btn-solid mt-6 w-full">
            Let&apos;s talk
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
