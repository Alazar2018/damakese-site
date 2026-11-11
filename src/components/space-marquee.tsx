"use client";

import { useEffect, useRef, useState } from "react";
import { frames } from "@/lib/photos";

export type RoomSlide = {
  src: string;
  alt: string;
  label: string;
};

export const rooms: RoomSlide[] = [
  { src: frames.hall, alt: "An event floor, lit and empty, before the doors open.", label: "The hall" },
  { src: frames.about, alt: "People gathered in a room before an evening event.", label: "Before doors" },
  { src: frames.conference, alt: "A speaker at a lectern, with the room listening.", label: "Conference" },
  { src: frames.state, alt: "A banquet room set with white linen and glassware.", label: "State occasion" },
  { src: frames.concert, alt: "Stage lights over a concert audience.", label: "Concert" },
  { src: frames.exhibition, alt: "A wide hall set for an exhibition.", label: "Exhibition" },
  { src: frames.launch, alt: "A presenter opening a launch in a seated room.", label: "Launch" },
  { src: frames.fair, alt: "A trade-fair floor before the aisles fill.", label: "Trade fair" },
  { src: frames.stage, alt: "A stage before the house lights drop.", label: "The stage" },
  { src: frames.protocol, alt: "A formal table set for the evening.", label: "Protocol" },
];

const SPEED = 0.8;

export function SpaceMarquee({
  slides = rooms,
  topClass = "text-ivory",
}: {
  slides?: RoomSlide[];
  topClass?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const reducedRef = useRef(false);
  const activeRef = useRef(0);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2;
        if (!draggingRef.current && !reducedRef.current) {
          const velocity = velocityRef.current;
          if (Math.abs(velocity) > 0.1) {
            offsetRef.current += velocity;
            velocityRef.current = velocity * 0.95;
          } else {
            velocityRef.current = 0;
            offsetRef.current -= SPEED;
          }
        }
        if (half > 0) {
          if (offsetRef.current <= -half) offsetRef.current += half;
          if (offsetRef.current > 0) offsetRef.current -= half;
        }
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

        const mid = window.innerWidth / 2;
        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;
        track.querySelectorAll<HTMLElement>("[data-index]").forEach((slide) => {
          const rect = slide.getBoundingClientRect();
          const distance = Math.abs(rect.left + rect.width / 2 - mid);
          if (distance < bestDist) {
            bestDist = distance;
            best = Number(slide.dataset.index);
          }
        });
        if (best !== activeRef.current && captionRef.current) {
          activeRef.current = best;
          captionRef.current.textContent = slides[best]?.label ?? "";
        }
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [slides]);

  function nudge(velocity: number) {
    velocityRef.current = velocity;
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    velocityRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    startX.current = event.clientX;
    startOffset.current = offsetRef.current;
    lastX.current = event.clientX;
    lastT.current = performance.now();
    setGrabbing(true);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = event.clientX - lastX.current;
    const dt = Math.max(now - lastT.current, 1);
    velocityRef.current = (dx / dt) * 16;
    lastX.current = event.clientX;
    lastT.current = now;
    offsetRef.current = startOffset.current + (event.clientX - startX.current);
  }

  function endDrag() {
    draggingRef.current = false;
    setGrabbing(false);
  }

  const loop = [...slides, ...slides];

  return (
    <section className={`bg-ivory ${topClass === "text-green" ? "pt-0 pb-4" : "py-4"}`} aria-label="Rooms">
      <p className="sr-only">
        A moving row of rooms. Drag horizontally, or use the previous and next buttons.
      </p>
      <div className="relative overflow-hidden">
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-20 sm:h-[100px] ${topClass}`}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-full w-full">
            <path fill="currentColor" d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z" />
          </svg>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 text-ivory sm:h-[100px]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-full w-full">
            <path fill="currentColor" d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z" />
          </svg>
        </div>
        <div
          ref={trackRef}
          className={`flex w-max touch-none gap-3 py-4 select-none sm:gap-4 ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ willChange: "transform" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {loop.map((slide, index) => (
            <div
              key={`${slide.label}-${index}`}
              data-index={index % slides.length}
              className="h-80 w-60 shrink-0 overflow-hidden rounded-2xl sm:h-[32rem] sm:w-80"
            >
              <img src={slide.src} alt={index < slides.length ? slide.alt : ""} className="pointer-events-none h-full w-full object-cover" draggable={false} />
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-xl items-center justify-center gap-6 px-5 pt-2">
        <button type="button" className="ui min-h-11 cursor-pointer text-sm font-medium text-green underline decoration-stone underline-offset-4 hover:decoration-green" onClick={() => nudge(36)}>
          Previous
        </button>
        <p ref={captionRef} className="eyebrow min-w-36 text-center">
          {slides[0]?.label}
        </p>
        <button type="button" className="ui min-h-11 cursor-pointer text-sm font-medium text-green underline decoration-stone underline-offset-4 hover:decoration-green" onClick={() => nudge(-36)}>
          Next
        </button>
      </div>
    </section>
  );
}
