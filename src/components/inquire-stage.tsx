"use client";

import { useState } from "react";
import { InquireForm } from "@/components/inquire-form";
import { frames } from "@/lib/photos";

const holds = [
  { id: "brief-name", index: "01", line: "Who is asking.", note: "The name, and the organisation the day is for." },
  { id: "brief-kind", index: "02", line: "Which kind of day.", note: "Conference, state occasion, concert, exhibition, or launch." },
  { id: "brief-date", index: "03", line: "The date, once it is real.", note: "A date we confirm is a date we keep." },
  { id: "brief-achieve", index: "04", line: "What that day has to achieve.", note: "Open with the day, not with a catalogue." },
];

export function InquireStage() {
  const [step, setStep] = useState(0);
  const current = holds[step];

  function go(index: number) {
    setStep(index);
    document.getElementById(holds[index].id)?.focus();
  }

  return (
    <div className="grid md:min-h-screen md:grid-cols-12">
      <header className="on-green relative min-h-[78dvh] bg-green text-ivory md:sticky md:top-0 md:col-span-5 md:h-screen md:min-h-0 md:self-start">
        <img src={frames.launch} alt="" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--green) 34%, transparent) 0%, color-mix(in srgb, var(--green) 78%, black) 100%)",
          }}
        />
        <div className="relative flex h-full min-h-[78dvh] flex-col justify-end p-8 pt-32 md:min-h-screen md:p-12">
          <p className="eyebrow">Inquire · {current.index}</p>
          <h1 className="display mt-4 text-4xl md:text-5xl">Tell us what the day has to achieve.</h1>
          <span className="rule mt-6" />
          <p className="mt-6 max-w-sm text-2xl leading-snug text-ivory">{current.line}</p>
          <p className="mt-4 max-w-sm text-ivory/80">{current.note}</p>
        </div>
      </header>
      <div className="px-5 pt-28 pb-12 md:col-span-7 md:px-14 md:pt-32 md:pb-16">
        <ol className="mb-10 grid gap-3 sm:grid-cols-2">
          {holds.map((hold, index) => {
            const selected = step === index;
            return (
              <li key={hold.index}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => go(index)}
                  className={`w-full cursor-pointer border-t px-1 py-3 text-left ${selected ? "border-green" : "border-stone"}`}
                >
                  <span className="ui block text-sm font-medium text-forest">{hold.index}</span>
                  <span className="mt-1 block text-green">{hold.line}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <InquireForm onStep={setStep} />
        <p className="mt-8 max-w-md text-sm">
          Addis Ababa, and the rooms this city actually has. Large days need months. A small room still needs a second plan.
        </p>
      </div>
    </div>
  );
}
