"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";

const book = [
  { href: "/about", label: "About" },
  { href: "/practice", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/clients", label: "Clients" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/career", label: "Career" },
];

export function SiteFooter({ line = true }: { line?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={root} className="bg-green text-ivory">
      <div className={`footer-stage on-green relative overflow-hidden bg-green text-ivory ${shown ? "is-in" : ""}`}>
        <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-lime/20 blur-3xl" />
        <div className="relative mx-auto max-w-[90rem] px-6 py-14 md:px-12 md:py-20">
          {line ? (
            <p className="display max-w-3xl text-4xl leading-[1.02] md:text-6xl">
              Designing the moment.
              <span className="mt-2 block text-lime">Delivering the day.</span>
            </p>
          ) : (
            <p className="display max-w-3xl text-4xl leading-[1.02] md:text-6xl">
              The book stays open.
              <span className="mt-2 block text-lime">Addis Ababa.</span>
            </p>
          )}
          <span className="rule mt-8" />
          <div className="mt-12 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Logo ink="#f6f7f3" className="h-auto w-40" />
              <p className="mt-6 max-w-xs text-[1.05rem] leading-relaxed text-ivory/85">
                Damakese Marketing & Events. Marketing, events and entertainment in Addis Ababa.
              </p>
            </div>
            <nav className="md:col-span-5" aria-label="The book">
              <p className="eyebrow">The book</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6">
                {book.map((item) => (
                  <li key={item.href}>
                    <Link className="ui group inline-flex min-h-11 items-center gap-2 text-sm" href={item.href}>
                      <span className="h-1.5 w-1.5 bg-lime transition group-hover:scale-150" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="md:col-span-3">
              <p className="eyebrow">Where</p>
              <p className="mt-4 text-[1.05rem]">Addis Ababa, Ethiopia</p>
              <p className="mt-2 text-[1.05rem] text-ivory/80">Nine years of industry experience across the team.</p>
              <Link className="btn btn-inverse mt-6" href="/inquire">
                Let&apos;s talk
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
            <p className="ui text-xs tracking-[0.14em] text-lime uppercase">Volume One · 2026 · Damakese</p>
            <Link className="ui text-xs tracking-[0.14em] text-ivory/70 uppercase hover:text-lime" href="/admin/login">
              Studio desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
