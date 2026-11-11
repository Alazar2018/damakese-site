"use client";

import { useState } from "react";
import { practices } from "@/lib/content";

export function PracticeStack({
  open: controlled,
  onOpen,
}: {
  open?: number;
  onOpen?: (index: number) => void;
}) {
  const [local, setLocal] = useState(0);
  const open = controlled ?? local;
  const current = practices[open] ?? practices[0];

  function setOpen(index: number) {
    onOpen?.(index);
    if (controlled === undefined) setLocal(index);
  }

  return (
    <section id="the-five" className="bg-sand">
      <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
        <p className="eyebrow">The five</p>
        <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Pick the kind of day.</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
          {practices.map((item, index) => {
            const selected = open === index;
            return (
              <li key={item.kind}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setOpen(index)}
                  className="lean-card group block w-full cursor-pointer text-left"
                  style={{ ["--lean" as string]: selected ? "0deg" : index % 2 === 0 ? "-2.5deg" : "2.5deg" }}
                >
                  <span className="block overflow-hidden bg-green">
                    <img src={item.image} alt="" className="photo-zoom aspect-[4/5] w-full object-cover" />
                  </span>
                  <span className="mt-4 block min-h-11">
                    <span className="ui block text-xs font-medium tracking-[0.16em] text-forest uppercase">{item.index}</span>
                    <span className={`rule mt-3 ${selected ? "" : "scale-x-0"}`} />
                    <span className="display mt-3 block text-lg leading-tight text-green">{item.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <article key={current.kind} className="fade-up mt-16 grid bg-ivory md:mt-24 md:grid-cols-2">
          <img src={current.image} alt={current.imageAlt} className="aspect-[4/3] h-full w-full object-cover" />
          <div className="flex flex-col justify-center px-8 py-12 md:px-14 md:py-16">
            <p className="eyebrow">{current.index}</p>
            <h3 className="display mt-3 text-4xl text-green">{current.title}</h3>
            <span className="rule mt-5" />
            <p className="mt-5 text-xl text-green">{current.line}</p>
            <p className="mt-4 max-w-[var(--measure)] text-lg">{current.detail}</p>
            <ul className="mt-6 space-y-2">
              {current.includes.map((point) => (
                <li key={point} className="border-t border-stone pt-2">{point}</li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
