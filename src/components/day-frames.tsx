"use client";

import { useState } from "react";
import type { DayPicture } from "@/lib/store";

export function DayFrames({ images, name }: { images: DayPicture[]; name: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div>
      <div className="overflow-hidden">
        <img src={current.src} alt={current.alt || name} className="photo-zoom aspect-[16/10] w-full object-cover" />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto p-3" role="tablist" aria-label={`Photographs of ${name}`}>
          {images.map((picture, index) => {
            const selected = index === Math.min(active, images.length - 1);
            return (
              <button
                key={picture.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={picture.alt || `Photograph ${index + 1}`}
                className="shrink-0 cursor-pointer"
                onClick={() => setActive(index)}
              >
                <img src={picture.src} alt="" className={`h-14 w-20 object-cover ${selected ? "" : "opacity-60"}`} />
                <span className={`mt-1 block h-0.5 ${selected ? "bg-green" : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
