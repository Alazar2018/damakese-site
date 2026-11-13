"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { sharp } from "@/lib/photos";

export type ReelSlide = {
  image: string;
  srcSet?: string;
  title: string;
  accent: string;
  lede: string;
};

const stage = sharp("photo-1540039155733-5bb30b53aa14");
const lights = sharp("photo-1429962714451-bb934ecdc4ec");
const crowd = sharp("photo-1501281668745-f7f57925c3b4");
const room = sharp("photo-1511578314322-379afb476865");
const night = sharp("photo-1492684223066-81342ee5ff30");

const homeSlides: readonly ReelSlide[] = [
  {
    ...stage,
    title: "Rooted in",
    accent: "experience.",
    lede: "A full-service marketing, events and entertainment company in Addis Ababa.",
  },
  {
    ...lights,
    title: "Driven by",
    accent: "creativity.",
    lede: "Campaigns, identities, and the live moment people remember.",
  },
  {
    ...room,
    title: "Before the",
    accent: "doors open.",
    lede: "The room, the stage, and the crew are finished before the first guest arrives.",
  },
  {
    ...crowd,
    title: "The crowd",
    accent: "takes over.",
    lede: "Concerts, exhibitions, trade fairs, and corporate and institutional events.",
  },
  {
    ...night,
    title: "Nine years.",
    accent: "One name.",
    lede: "A new company, built on more than nine years of team experience.",
  },
];

export function HomeHero() {
  return <PictureReel variant="poster" eyebrow="Addis Ababa" />;
}

export function PictureReel({
  eyebrow = "Damakese Marketing & Events",
  slides = homeSlides,
  tall = true,
  variant = "stack",
}: {
  eyebrow?: string;
  slides?: readonly ReelSlide[];
  tall?: boolean;
  variant?: "stack" | "poster";
}) {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);
  const [paused, setPaused] = useState(false);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const lookRef = useRef({ x: 0, y: 0 });
  const lookFrame = useRef(0);
  const root = useRef<HTMLElement>(null);
  const seen = useRef(true);
  const count = slides.length;
  const current = slides[index];
  const poster = variant === "poster";

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    return () => {
      if (lookFrame.current) window.cancelAnimationFrame(lookFrame.current);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        seen.current = entry.isIntersecting && entry.intersectionRatio > 0.45;
      },
      { threshold: [0, 0.45, 1] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      const inside = root.current?.contains(target ?? null);
      if (!inside && !seen.current) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      go(event.key === "ArrowRight" ? index + 1 : index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  useEffect(() => {
    if (poster || reduce || paused) return;
    const id = window.setInterval(() => go(index + 1), 5600);
    return () => window.clearInterval(id);
  }, [go, index, paused, poster, reduce]);

  const height = tall ? "min-h-[100dvh]" : "min-h-[72dvh]";

  return (
    <header
      ref={root}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Pictures"
      className={`on-green relative overflow-hidden bg-green text-ivory ${height}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setLook({ x: 0, y: 0 });
      }}
      onPointerMove={(event) => {
        if (!poster || reduce) return;
        const box = event.currentTarget.getBoundingClientRect();
        lookRef.current = {
          x: (event.clientX - box.left) / box.width - 0.5,
          y: (event.clientY - box.top) / box.height - 0.5,
        };
        if (lookFrame.current) return;
        lookFrame.current = window.requestAnimationFrame(() => {
          lookFrame.current = 0;
          setLook(lookRef.current);
        });
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      {slides.map((slide, item) => {
        const active = item === index;
        return (
          <img
            key={slide.accent}
            src={slide.image}
            srcSet={slide.srcSet}
            sizes="100vw"
            alt=""
            fetchPriority={poster && item === 0 ? "high" : "auto"}
            decoding="async"
            draggable={false}
            style={
              poster && active && !reduce
                ? { transform: `translate3d(${look.x * -28}px, ${look.y * -18}px, 0) scale(1.08)` }
                : undefined
            }
            className={`absolute inset-0 h-full w-full object-cover object-[center_40%] transition-[opacity,transform] duration-700 ease-out ${
              poster ? "[filter:contrast(1.08)_saturate(1.12)]" : ""
            } ${active ? "opacity-100" : "opacity-0"} ${active && !reduce && !poster ? "hero-drift" : ""}`}
          />
        );
      })}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: poster
            ? "linear-gradient(180deg, rgba(8, 22, 14, 0.4) 0%, transparent 14%), linear-gradient(0deg, rgba(8, 22, 14, 0.45) 0%, transparent 22%), linear-gradient(100deg, rgba(14, 38, 24, 0.68) 0%, rgba(14, 38, 24, 0.28) 24%, transparent 58%)"
            : "linear-gradient(100deg, color-mix(in srgb, var(--green) 92%, black) 0%, color-mix(in srgb, var(--green) 72%, transparent) 46%, color-mix(in srgb, var(--green) 34%, transparent) 100%)",
        }}
      />
      {poster ? null : <div className="stage-panel absolute inset-y-0 left-0 z-20 w-14" aria-hidden />}
      {poster ? null : <div className="absolute inset-y-0 left-14 z-20 w-px bg-lime" aria-hidden />}
      {poster && !reduce ? (
        <div className="meteor-field" aria-hidden>
          {[
            { top: "8%", delay: "0s", dur: "3.6s", len: "9rem" },
            { top: "22%", delay: "1.2s", dur: "2.9s", len: "7rem" },
            { top: "38%", delay: "0.5s", dur: "4s", len: "11rem" },
            { top: "54%", delay: "1.9s", dur: "3.2s", len: "8rem" },
            { top: "68%", delay: "0.8s", dur: "2.7s", len: "6.5rem" },
            { top: "14%", delay: "2.4s", dur: "3.5s", len: "8rem" },
            { top: "46%", delay: "2.8s", dur: "3s", len: "7rem" },
          ].map((meteor) => (
            <span
              key={meteor.top}
              className="meteor"
              style={{ top: meteor.top, ["--delay" as string]: meteor.delay, ["--dur" as string]: meteor.dur, ["--len" as string]: meteor.len }}
            />
          ))}
        </div>
      ) : null}
      {poster ? (
        <div className="absolute top-32 bottom-56 left-[1.35rem] z-30 w-[3px] bg-ivory/25 lg:left-12" aria-hidden>
          {reduce ? (
            <div className="h-full w-full bg-lime" />
          ) : (
            <div
              key={index}
              className="hero-meter absolute inset-0 bg-lime"
              style={{ animationPlayState: paused ? "paused" : "running" }}
              onAnimationEnd={() => {
                if (!paused) go(index + 1);
              }}
            />
          )}
        </div>
      ) : null}
      <div
        className={`relative z-10 mx-auto flex max-w-[90rem] flex-col ${
          poster
            ? "min-h-[100dvh] justify-center px-5 pt-28 pb-40 pl-20 md:pl-28 lg:pr-16"
            : `justify-end px-5 pt-36 pb-28 pl-20 md:px-12 md:pb-24 md:pl-24 ${height}`
        }`}
      >
        <div key={poster ? index : "stack"}>
          {poster ? (
            <div className={`flex items-center gap-4 ${reduce ? "" : "hero-bounce"}`}>
              <span className="h-px w-10 bg-lime" />
              <p className="ui text-[11px] font-semibold tracking-[0.28em] text-ivory uppercase">{eyebrow}</p>
            </div>
          ) : (
            <p className="eyebrow">{eyebrow}</p>
          )}
          <h1
            className={
              poster
                ? "mt-5 max-w-[12ch] font-[family-name:var(--font-montserrat)] text-[clamp(2.7rem,5.8vw,5.4rem)] leading-[0.88] font-extrabold tracking-[-0.035em] text-ivory uppercase [text-shadow:0_10px_28px_rgba(8,22,14,0.65)]"
                : "display mt-4 max-w-5xl text-5xl leading-[0.98] sm:text-6xl md:text-8xl"
            }
          >
            <span className={`block ${poster ? `text-lime ${reduce ? "" : "hero-bounce hero-bounce-2"}` : ""}`}>{current.title}</span>
            <span className={`mt-1 block ${poster ? `text-ivory ${reduce ? "" : "hero-bounce hero-bounce-3"}` : "text-lime"}`}>
              {current.accent}
            </span>
          </h1>
          <span className={`rule ${poster ? `mt-6 ${reduce ? "" : "hero-bounce hero-bounce-3"}` : "mt-7"}`} />
          <p className={`leading-relaxed text-ivory/90 ${poster ? `mt-5 max-w-md text-base [text-shadow:0_2px_16px_rgba(8,22,14,0.75)] md:text-lg ${reduce ? "" : "hero-bounce hero-bounce-3"}` : "mt-6 max-w-xl text-lg"}`}>{current.lede}</p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className={poster ? "flex max-w-md flex-col gap-5 px-5 pb-8 pl-20 md:pl-28 lg:pb-10" : "mx-auto flex max-w-[90rem] items-end justify-between gap-6 px-5 pb-6 md:px-12 md:pb-8"}>
          <p key={poster ? index : "count"} className={poster ? `display text-5xl leading-none text-lime lg:text-6xl ${reduce ? "" : "hero-bounce"}` : "ui text-sm tracking-[0.16em]"}>
            <span className={poster ? "" : "text-ivory"}>{String(index + 1).padStart(2, "0")}</span>
            {poster ? null : <span className="text-ivory/50"> / {String(count).padStart(2, "0")}</span>}
          </p>
          <div className={`flex items-center gap-2 ${poster ? "justify-between" : ""}`} role="tablist" aria-label="Hero pictures">
            {slides.map((slide, item) => (
              <button
                key={slide.accent}
                type="button"
                role="tab"
                aria-selected={item === index}
                aria-label={`Show picture ${item + 1}: ${slide.title} ${slide.accent}`}
                onClick={() => go(item)}
                className={`cursor-pointer transition-all ${
                  poster
                    ? item === index
                      ? "h-7 w-[3px] bg-lime"
                      : "h-4 w-[3px] bg-ivory/40"
                    : item === index
                      ? "h-1 w-10 rounded-full bg-lime"
                      : "h-1 w-6 rounded-full bg-ivory/40"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous picture"
              onClick={() => go(index - 1)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-ivory/40 text-ivory hover:bg-lime hover:text-green"
            >
              <CaretLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next picture"
              onClick={() => go(index + 1)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-ivory/40 text-ivory hover:bg-lime hover:text-green"
            >
              <CaretRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
