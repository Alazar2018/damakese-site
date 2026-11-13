"use client";

import { useState } from "react";
import { frames } from "@/lib/photos";

const lines = [
  {
    title: ["Rooted in", "experience."],
    lede: "Nine years of industry experience, now under one name.",
    image: frames.hall,
    alt: "An event floor, lit and empty, before the doors open.",
    caption: "Before the doors open.",
  },
  {
    title: ["Driven by", "creativity."],
    lede: "Campaigns, identities, and the live moment people remember.",
    image: frames.concert,
    alt: "Stage lights over a concert audience.",
    caption: "The moment the crowd takes over.",
  },
] as const;

export function AboutHero() {
  const [pressed, setPressed] = useState(0);
  const current = lines[pressed];

  return (
    <header className="grid md:min-h-[100dvh] md:grid-cols-2">
      <div className="flex flex-col justify-end px-5 pt-32 pb-12 md:px-14 md:pb-20">
        <p className="eyebrow fade-up">About us</p>
        <h1 className="display mt-4 text-4xl text-green sm:text-5xl md:text-6xl">
          {current.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <span className="rule mt-7" />
        <p className="mt-8 max-w-xl text-2xl leading-snug text-green italic md:text-3xl">{current.lede}</p>
        <div className="mt-8 flex gap-3">
          {lines.map((line, index) => (
            <button
              key={line.caption}
              type="button"
              aria-pressed={pressed === index}
              onClick={() => setPressed(index)}
              className={`ui cursor-pointer rounded-full px-4 py-2 text-sm ${
                pressed === index ? "bg-green text-ivory" : "bg-white text-green"
              }`}
            >
              {index === 0 ? "Experience" : "Creativity"}
            </button>
          ))}
        </div>
      </div>
      <figure className="relative min-h-[70dvh] overflow-hidden md:min-h-full">
        <img src={current.image} alt={current.alt} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(transparent, color-mix(in srgb, var(--green) 78%, black))" }}
        />
        <figcaption className="ui absolute bottom-8 left-8 text-xs tracking-[0.14em] text-ivory uppercase">
          {current.caption}
        </figcaption>
      </figure>
    </header>
  );
}
