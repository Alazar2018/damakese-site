"use client";

import { FormEvent, useState } from "react";
import { KINDS, type Kind } from "@/lib/content";
import { useDesk } from "@/lib/store";

const empty = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  kind: "Conference" as Kind,
  date: "",
  city: "Addis Ababa",
  brief: "",
};

export function InquireForm({ onStep }: { onStep?: (step: number) => void }) {
  const { addInquiry } = useDesk();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function update(key: keyof typeof empty, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Give us the name we should use.";
    if (values.organisation.trim().length < 2) next.organisation = "Which organisation is the day for?";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "We need an email we can answer.";
    if (values.brief.trim().length < 12) next.brief = "Tell us what the day has to achieve.";
    setErrors(next);
    if (Object.keys(next).length) return;
    try {
      await addInquiry(values);
      setSent(true);
    } catch {
      setErrors({ brief: "The brief did not leave this page. Try again in a moment." });
    }
  }

  if (sent) {
    return (
      <div role="status" className="bg-sand p-8 md:p-10">
        <p className="eyebrow">Received</p>
        <h2 className="display mt-4 text-4xl text-green">We have the date.</h2>
        <span className="rule mt-5" />
        <p className="mt-5 max-w-[var(--measure)] text-lg">
          A date we confirm is a date we keep. We will answer with whether we can hold this one, and what the day has to achieve before anything is built.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field">
          <span>Name</span>
          <input id="brief-name" value={values.name} onFocus={() => onStep?.(0)} onChange={(event) => update("name", event.target.value)} autoComplete="name" />
          {errors.name ? <p className="error">{errors.name}</p> : null}
        </label>
        <label className="field">
          <span>Organisation</span>
          <input id="brief-organisation" value={values.organisation} onFocus={() => onStep?.(0)} onChange={(event) => update("organisation", event.target.value)} autoComplete="organization" />
          {errors.organisation ? <p className="error">{errors.organisation}</p> : null}
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field">
          <span>Email</span>
          <input id="brief-email" type="email" value={values.email} onFocus={() => onStep?.(0)} onChange={(event) => update("email", event.target.value)} autoComplete="email" />
          {errors.email ? <p className="error">{errors.email}</p> : null}
        </label>
        <label className="field">
          <span>Phone, if useful</span>
          <input value={values.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <label className="field">
          <span>Kind of day</span>
          <select id="brief-kind" value={values.kind} onFocus={() => onStep?.(1)} onChange={(event) => update("kind", event.target.value)}>
            {KINDS.map((kind) => (
              <option key={kind}>{kind}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>The date</span>
          <input id="brief-date" type="date" value={values.date} onFocus={() => onStep?.(2)} onChange={(event) => update("date", event.target.value)} />
        </label>
        <label className="field">
          <span>City</span>
          <input value={values.city} onChange={(event) => update("city", event.target.value)} />
        </label>
      </div>
      <label className="field">
        <span>What the day has to achieve</span>
        <textarea id="brief-achieve" value={values.brief} onFocus={() => onStep?.(3)} onChange={(event) => update("brief", event.target.value)} />
        {errors.brief ? <p className="error">{errors.brief}</p> : null}
      </label>
      <button type="submit" className="btn btn-solid w-full sm:w-auto">
        Send the brief
      </button>
    </form>
  );
}
