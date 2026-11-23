"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FilmRail } from "@/components/film-rail";
import { PracticeStack } from "@/components/practice-stack";
import { disciplines, howWeWork, practices } from "@/lib/content";

export function PracticeView() {
  const [open, setOpen] = useState(0);
  const [step, setStep] = useState(0);

  function choose(index: number) {
    setOpen(index);
    document.getElementById("the-five")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <>
      <section className="bg-ivory">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
          <p className="eyebrow">What we do</p>
          <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Four ways the work shows up.</h2>
          <div className="mt-12 grid gap-8">
            {disciplines.map((item, index) => (
              <article id={item.id} key={item.id} className="group grid scroll-mt-24 overflow-hidden rounded-[1.35rem] bg-sand md:grid-cols-2">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className={`aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] ${index % 2 ? "md:order-2" : ""}`}
                />
                <div className="flex flex-col justify-center px-6 py-10 md:px-12">
                  <p className="ui text-xs font-medium tracking-[0.16em] text-forest uppercase">{item.index}</p>
                  <h3 className="display mt-3 text-3xl text-green transition-transform duration-200 group-hover:translate-x-2">{item.title}</h3>
                  <p className="mt-3 text-xl text-green">{item.line}</p>
                  <span className="rule mt-5" />
                  <p className="mt-5 max-w-[var(--measure)] text-lg leading-relaxed">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FilmRail />

      <header className="on-green bg-green text-ivory">
        <div className="mx-auto max-w-[90rem] px-5 pt-16 pb-12 md:px-12 md:pt-20">
          <p className="eyebrow fade-up">Practice</p>
          <h2 className="display mt-4 max-w-4xl text-4xl sm:text-5xl md:text-7xl">
            <span className="block overflow-hidden">
              <span className="line-rise">What do we want</span>
            </span>
            <span className="mt-2 block overflow-hidden">
              <span className="line-rise text-lime" style={{ animationDelay: "120ms" }}>
                people to take away?
              </span>
            </span>
          </h2>
          <span className="rule rule-draw mt-7" />
          <p className="fade-up mt-6 max-w-xl text-lg text-ivory/85" style={{ animationDelay: "240ms" }}>
            Campaigns, identities, events and live shows. Choose a day below and the practice opens to it.
          </p>
        </div>
        <div className="mx-auto grid max-w-[90rem] items-end gap-3 px-5 pb-16 sm:grid-cols-2 md:px-12 lg:grid-cols-5" role="list">
          {practices.map((item, index) => {
            const selected = open === index;
            return (
              <button
                key={item.kind}
                type="button"
                role="listitem"
                aria-pressed={selected}
                onClick={() => choose(index)}
                style={{ ["--step" as string]: index }}
                className={`bento-tile cursor-pointer px-5 py-6 text-left lg:mb-[calc(var(--step)*0.7rem)] ${
                  selected ? "bg-lime text-green" : "bg-[#0c2416] text-ivory weave hover:bg-[#163526]"
                }`}
              >
                <span className={`ui block text-xs font-medium tracking-[0.16em] uppercase ${selected ? "text-forest" : "text-lime"}`}>{item.index}</span>
                <span className="display mt-3 block text-2xl">{item.title}</span>
                <span className={`mt-2 block text-sm leading-relaxed ${selected ? "text-green/80" : "text-ivory/75"}`}>{item.line}</span>
              </button>
            );
          })}
        </div>
      </header>

      <PracticeStack open={open} onOpen={setOpen} />

      <section className="on-green relative overflow-hidden bg-green text-ivory">
        <div className="weave pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto grid max-w-[90rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-12 md:py-24">
          <div className="md:col-span-5">
            <p className="eyebrow">End to end</p>
            <h2 className="display mt-4 text-4xl">The day, in the order it is made.</h2>
            <span className="rule mt-6" />
            <p className="mt-6 max-w-sm text-lg text-ivory/85">{howWeWork[step]}</p>
            <Link href="/inquire" className="btn btn-inverse mt-8">
              Let&apos;s talk
            </Link>
          </div>
          <ol className="md:col-span-6 md:col-start-7">
            {howWeWork.map((item, index) => {
              const selected = step === index;
              return (
                <li key={item}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setStep(index)}
                    className={`grid w-full cursor-pointer grid-cols-[2.5rem_1fr] gap-3 border-t py-4 text-left transition-transform duration-200 ${selected ? "translate-x-2 border-lime text-lime" : "border-ivory/25 text-ivory/65 hover:translate-x-2"}`}
                  >
                    <span className="ui text-sm">{`0${index + 1}`}</span>
                    <span>{item}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
