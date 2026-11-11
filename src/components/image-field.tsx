"use client";

import { useState } from "react";
import type { DayPicture } from "@/lib/store";

const limit = 8;

export function ImageField({
  pictures,
  onChange,
}: {
  pictures: DayPicture[];
  onChange: (pictures: DayPicture[]) => void;
}) {
  const [error, setError] = useState("");

  function readFile(file: File) {
    return new Promise<DayPicture | null>((resolve) => {
      if (!file.type.startsWith("image/")) {
        setError("Use a photograph. JPG, PNG, or WebP.");
        resolve(null);
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        setError("That file is larger than this desk can take. Try one under 12 MB.");
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 1400;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setError("This browser could not prepare the photograph.");
            resolve(null);
            return;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve({
            id: `new-${Math.random().toString(36).slice(2, 8)}`,
            src: canvas.toDataURL("image/jpeg", 0.72),
            alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          });
        };
        img.onerror = () => {
          setError("That file could not be read as a photograph.");
          resolve(null);
        };
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="grid gap-3 md:col-span-2">
      <p className="ui text-xs font-medium tracking-[0.2em] text-forest uppercase">Photographs</p>
      {pictures.length === 0 ? (
        <div className="grid aspect-[16/9] place-items-center bg-sand px-6 text-center text-sm">No photograph yet.</div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {pictures.map((picture, index) => (
            <li key={picture.id} className="bg-sand">
              <img src={picture.src} alt={picture.alt || ""} className="aspect-[16/10] w-full object-cover" />
              <div className="grid gap-2 p-3">
                <p className="ui text-xs tracking-[0.14em] text-forest uppercase">{index === 0 ? "Cover" : `0${index + 1}`}</p>
                <input
                  value={picture.alt}
                  aria-label={`What photograph ${index + 1} shows`}
                  className="min-h-11 border border-stone bg-white px-3"
                  onChange={(event) =>
                    onChange(pictures.map((item) => (item.id === picture.id ? { ...item, alt: event.target.value } : item)))
                  }
                />
                <button
                  type="button"
                  className="ui min-h-11 w-fit cursor-pointer text-sm text-wine"
                  onClick={() => onChange(pictures.filter((item) => item.id !== picture.id))}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {pictures.length < limit ? (
        <label className="field">
          <span>{pictures.length ? "Add another photograph" : "Upload a photograph"}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(event) => {
              const files = [...(event.target.files ?? [])].slice(0, limit - pictures.length);
              event.currentTarget.value = "";
              void Promise.all(files.map(readFile)).then((added) => {
                const next = added.filter((picture): picture is DayPicture => picture !== null);
                if (next.length) {
                  onChange([...pictures, ...next]);
                  setError("");
                }
              });
            }}
          />
        </label>
      ) : (
        <p className="text-sm text-forest">Eight photographs is the day’s limit.</p>
      )}
      <p className="text-sm text-forest">The first photograph is the cover. The rest sit with the day.</p>
      {error ? <p className="text-sm text-wine">{error}</p> : null}
    </div>
  );
}
