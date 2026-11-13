"use client";

import { FormEvent, useState } from "react";
import { useDesk } from "@/lib/store";

export function CareerApply({ role }: { role: string }) {
  const { addInquiry } = useDesk();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [letter, setLetter] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Give us the name we should use.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "We need an email we can answer.";
    if (letter.trim().length < 12) next.letter = "Tell us the work you have done, in a sentence or two.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`career-${first}`)?.focus();
      return;
    }
    setSending(true);
    try {
      await addInquiry({
        name: name.trim(),
        organisation: `Career · ${role}`,
        email: email.trim(),
        phone: phone.trim(),
        kind: "Conference",
        date: "",
        city: "Addis Ababa",
        brief: `Career application for ${role}.\n\n${letter.trim()}`,
      });
      setSent(true);
    } catch {
      setErrors({ letter: "The note did not leave this page. Try again in a moment." });
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="bg-sand p-8">
        <p className="eyebrow">Received</p>
        <h2 className="display mt-4 text-3xl text-green">We have your note.</h2>
        <p className="mt-4">If the seat is one we can talk about, we will write back.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <label className="field">
        <span>Name</span>
        <input id="career-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "career-name-error" : undefined} />
        {errors.name ? <p id="career-name-error" className="error">{errors.name}</p> : null}
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field">
          <span>Email</span>
          <input id="career-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "career-email-error" : undefined} />
          {errors.email ? <p id="career-email-error" className="error">{errors.email}</p> : null}
        </label>
        <label className="field">
          <span>Phone, if useful</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
        </label>
      </div>
      <label className="field">
        <span>The work you have done</span>
        <textarea id="career-letter" rows={5} value={letter} onChange={(event) => setLetter(event.target.value)} aria-invalid={Boolean(errors.letter)} aria-describedby={errors.letter ? "career-letter-error" : undefined} />
        {errors.letter ? <p id="career-letter-error" className="error">{errors.letter}</p> : null}
      </label>
      <button type="submit" className="btn btn-solid w-fit" disabled={sending}>
        {sending ? "Sending the note" : "Send the note"}
      </button>
    </form>
  );
}
