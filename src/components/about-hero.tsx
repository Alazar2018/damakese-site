"use client";

import { useState } from "react";
import { frames } from "@/lib/photos";

export function AboutHero() {
  const [pressed, setPressed] = useState(false);

  return (
    <header className="grid md:min-h-[100dvh] md:grid-cols-2">
      <div className="flex flex-col justify-end px-5 pt-32 pb-12 md:px-14 md:pb-20">
        <p className="eyebrow fade-up">About</p>
        <h1 className="display mt-4 text-4xl text-green sm:text-5xl md:text-6xl">
          <span className="block overflow-hidden">
            <span className="line-rise">Named after something</span>
          </span>
          <span className="block overflow-hidden">
            <span className="line-rise" style={{ animationDelay: "120ms" }}>
              that works.
            </span>
          </span>
        </h1>
        <span className="rule rule-draw mt-7" />
        <p className="mt-8 max-w-xl text-2xl leading-snug text-green italic md:text-3xl">
          {pressed
            ? "Everything it has comes out when it is pressed."
            : "The leaf gives nothing while it sits on the branch."}
        </p>
        <button
          type="button"
          aria-pressed={pressed}
          onClick={() => setPressed((value) => !value)}
          className="btn btn-solid mt-8 w-fit cursor-pointer"
        >
          {pressed ? "Release the leaf" : "Press the leaf"}
        </button>
      </div>
      <figure className="relative min-h-[70dvh] overflow-hidden md:min-h-full">
        <img
          src={pressed ? frames.hall : frames.about}
          alt={pressed ? "An event floor, lit and empty, before the doors open." : "People gathered in a room before an evening event."}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700"
          style={{ transform: pressed ? "scale(1.06)" : "scale(1)" }}
        />
        <span aria-hidden className="sheen" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(transparent, color-mix(in srgb, var(--green) 78%, black))" }}
        />
        <figcaption className="ui absolute bottom-8 left-8 text-xs tracking-[0.14em] text-ivory uppercase">
          {pressed ? "The hour it is pressed." : "A room, before the day begins."}
        </figcaption>
      </figure>
    </header>
  );
}
