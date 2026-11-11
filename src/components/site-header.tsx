"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { addisTime } from "@/lib/format";

const links = [
  { href: "/work", label: "Work" },
  { href: "/practice", label: "Practice" },
  { href: "/about", label: "About" },
  { href: "/inquire", label: "Inquire" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wide, setWide] = useState(false);
  const [time, setTime] = useState("");
  const overHero =
    wide &&
    (pathname === "/" || pathname === "/work" || pathname === "/practice") &&
    !scrolled &&
    !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const media = window.matchMedia("(min-width: 1024px)");
    const onMedia = () => setWide(media.matches);
    onMedia();
    media.addEventListener("change", onMedia);
    return () => {
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", onMedia);
    };
  }, []);

  useEffect(() => {
    const tick = () => setTime(addisTime());
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        overHero ? "on-green bg-transparent text-ivory" : "bg-ivory text-green"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-6 px-5 md:px-12">
        <Link href="/" className="block shrink-0" aria-label="Damakese, home">
          <Logo ink={overHero ? "#F6F7F3" : "#12341D"} className="h-11 w-auto md:h-14" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`ui text-sm font-medium ${active ? `underline decoration-2 underline-offset-8 ${overHero ? "decoration-lime" : "decoration-green"}` : ""}`}
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
          <Link href="/inquire" className={`btn hidden sm:inline-flex ${overHero ? "btn-inverse" : "btn-solid"}`}>
            Start a brief
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
        <nav id="mobile-nav" className="border-t border-stone bg-ivory px-5 py-6 text-green lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-stone">
                <Link href={link.href} className="ui flex min-h-12 items-center text-lg font-medium">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/inquire" className="btn btn-solid mt-6 w-full">
            Start a brief
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
