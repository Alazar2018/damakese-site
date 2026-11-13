"use client";

import { useState } from "react";
import { FilmRail } from "@/components/film-rail";
import { InquireForm } from "@/components/inquire-form";

const holds = [
  { id: "brief-name", index: "01", line: "Who is asking.", note: "The name, and the organisation the day is for." },
  { id: "brief-kind", index: "02", line: "Which kind of day.", note: "Conference, state occasion, concert, exhibition, or launch." },
  { id: "brief-date", index: "03", line: "The date, once it is real.", note: "A date we confirm is a date we keep." },
  { id: "brief-achieve", index: "04", line: "What that day has to achieve.", note: "Open with the day, not with a catalogue." },
];

export function InquireStage() {
  const [step, setStep] = useState(0);

  function go(index: number) {
    setStep(index);
    document.getElementById(holds[index].id)?.focus();
  }

  return (
    <div>
      <div className="mx-auto max-w-3xl px-5 pt-16 pb-12 md:px-8 md:pt-20 md:pb-16">
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
      <FilmRail />
    </div>
  );
}
