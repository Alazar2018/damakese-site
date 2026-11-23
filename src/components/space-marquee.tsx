"use client";

import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
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
  groundClass = "bg-ivory",
  bottomClass = "text-ivory",
}: {
  slides?: RoomSlide[];
  topClass?: string;
  groundClass?: string;
  bottomClass?: string;
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
  const draggedRef = useRef(false);
  const [grabbing, setGrabbing] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2;
        if (!draggingRef.current && open === null && !reducedRef.current) {
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
  }, [open, slides]);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open === null) {
      if (node.open) node.close();
      return;
    }
    if (!node.open) node.showModal();
  }, [open]);

  function step(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-index]");
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    velocityRef.current = 0;
    offsetRef.current += direction * (card.offsetWidth + gap);
  }

  function show(index: number) {
    if (draggedRef.current) return;
    setOpen(index);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    velocityRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    draggedRef.current = false;
    startX.current = event.clientX;
    startOffset.current = offsetRef.current;
    lastX.current = event.clientX;
    lastT.current = performance.now();
    setGrabbing(true);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const now = performance.now();
    if (Math.abs(event.clientX - startX.current) > 8) draggedRef.current = true;
    const dx = event.clientX - lastX.current;
    const dt = Math.max(now - lastT.current, 1);
    velocityRef.current = (dx / dt) * 16;
    lastX.current = event.clientX;
    lastT.current = now;
    offsetRef.current = startOffset.current + (event.clientX - startX.current);
  }

  function endDrag(event?: React.PointerEvent<HTMLDivElement>) {
    const moved = draggedRef.current;
    draggingRef.current = false;
    setGrabbing(false);
    if (!event || moved) return;
    const button = (event.target as HTMLElement).closest<HTMLElement>("button[data-index]");
    if (!button) return;
    setOpen(Number(button.dataset.index));
  }

  const loop = [...slides, ...slides];

  return (
    <section className={`${groundClass} ${topClass === "text-green" ? "pt-0 pb-4" : "py-4"}`} aria-label="Rooms">
      <p className="sr-only">
        A moving row of rooms. Drag horizontally, or use the previous and next buttons.
      </p>
      <div className="relative overflow-hidden">
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-20 sm:h-[100px] ${topClass}`}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-full w-full">
            <path fill="currentColor" d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z" />
          </svg>
        </div>
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 sm:h-[100px] ${bottomClass}`}>
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
          {loop.map((slide, index) => {
            const real = index % slides.length;
            return (
              <button
                key={`${slide.label}-${index}`}
                type="button"
                data-index={real}
                onClick={() => show(real)}
                className="group h-80 w-60 shrink-0 cursor-pointer overflow-hidden rounded-2xl sm:h-[32rem] sm:w-80"
              >
                <img src={slide.src} alt={index < slides.length ? slide.alt : ""} className="pointer-events-none h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" draggable={false} />
                <span className="sr-only">Open {slide.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mx-auto flex max-w-xl items-center justify-center gap-6 px-5 pt-2">
        <button type="button" aria-label="Previous room" className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-green text-green hover:bg-green hover:text-lime" onClick={() => step(1)}>
          <ArrowLeft size={18} />
        </button>
        <p ref={captionRef} className="eyebrow min-w-36 text-center">
          {slides[0]?.label}
        </p>
        <button type="button" aria-label="Next room" className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-green text-green hover:bg-green hover:text-lime" onClick={() => step(-1)}>
          <ArrowRight size={18} />
        </button>
      </div>
      <dialog
        ref={dialog}
        aria-label={open === null ? "Room" : slides[open]?.label}
        className="m-auto w-[min(72rem,calc(100%-2rem))] bg-ivory p-0 text-green backdrop:bg-green/70"
        onClose={() => setOpen(null)}
      >
        {open === null ? null : (
          <div>
            <div className="relative bg-green">
              <img src={slides[open].src} alt={slides[open].alt} className="max-h-[78vh] w-full object-cover" />
              <button type="button" onClick={() => setOpen((open + slides.length - 1) % slides.length)} className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ivory text-green">
                <ArrowLeft size={18} />
                <span className="sr-only">Previous room</span>
              </button>
              <button type="button" onClick={() => setOpen((open + 1) % slides.length)} className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ivory text-green">
                <ArrowRight size={18} />
                <span className="sr-only">Next room</span>
              </button>
              <button type="button" onClick={() => setOpen(null)} className="absolute top-3 right-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-ivory text-green">
                <X size={18} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <p className="px-6 py-5 text-lg">{slides[open].label}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
