"use client";

import Link from "next/link";
import { useState } from "react";
import { PracticeStack } from "@/components/practice-stack";
import { practices } from "@/lib/content";

const steps = [
  "The brief: what the day has to achieve.",
  "The idea, written before a supplier is called.",
  "The plan, and the second plan.",
  "Build, then test, then leave it alone.",
  "Doors. The crew stays until the last truck.",
];

export function PracticeView() {
  const [open, setOpen] = useState(0);
  const [step, setStep] = useState(0);

  function choose(index: number) {
    setOpen(index);
    document.getElementById("the-five")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <header className="on-green bg-green text-ivory">
        <div className="mx-auto max-w-[90rem] px-5 pt-32 pb-12 md:px-12 lg:pt-40">
          <p className="eyebrow fade-up">Practice</p>
          <h1 className="display mt-4 max-w-4xl text-4xl sm:text-5xl md:text-7xl">
            <span className="block overflow-hidden">
              <span className="line-rise">Five kinds of day.</span>
            </span>
            <span className="mt-2 block overflow-hidden">
              <span className="line-rise" style={{ animationDelay: "120ms" }}>
                One standard.
              </span>
            </span>
          </h1>
          <span className="rule rule-draw mt-7" />
          <p className="fade-up mt-6 max-w-xl text-lg text-ivory/85" style={{ animationDelay: "240ms" }}>
            Choose a kind. The day below opens to it.
          </p>
        </div>
        <div className="grid border-t border-ivory/20 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {practices.map((item, index) => {
            const selected = open === index;
            return (
              <button
                key={item.kind}
                type="button"
                role="listitem"
                aria-pressed={selected}
                onClick={() => choose(index)}
                className={`cursor-pointer border-ivory/20 px-5 py-6 text-left md:px-8 lg:border-l lg:first:border-l-0 ${selected ? "bg-ivory/10" : "hover:bg-ivory/5"}`}
              >
                <span className="ui block text-xs font-medium tracking-[0.16em] text-lime uppercase">{item.index}</span>
                <span className="display mt-3 block text-2xl">{item.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-ivory/75">{item.line}</span>
              </button>
            );
          })}
        </div>
      </header>

      <PracticeStack open={open} onOpen={setOpen} />

      <section className="on-green bg-green text-ivory">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-12 md:py-24">
          <div className="md:col-span-5">
            <p className="eyebrow">End to end</p>
            <h2 className="display mt-4 text-4xl">The day, in the order it is made.</h2>
            <span className="rule mt-6" />
            <p className="mt-6 max-w-sm text-lg text-ivory/85">{steps[step]}</p>
            <Link href="/inquire" className="btn btn-inverse mt-8">
              Start a brief
            </Link>
          </div>
          <ol className="md:col-span-6 md:col-start-7">
            {steps.map((item, index) => {
              const selected = step === index;
              return (
                <li key={item}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setStep(index)}
                    className={`grid w-full cursor-pointer grid-cols-[2.5rem_1fr] gap-3 border-t border-ivory/25 py-4 text-left ${selected ? "text-ivory" : "text-ivory/65"}`}
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
