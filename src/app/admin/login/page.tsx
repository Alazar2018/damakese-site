"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { useDesk } from "@/lib/store";

export default function LoginPage() {
  const { signIn } = useDesk();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    const ok = await signIn(email, password);
    setPending(false);
    if (ok) {
      router.push("/admin");
      return;
    }
    setError("That email and password do not open the desk.");
  }

  return (
    <main id="content" className="grid min-h-screen bg-ivory md:grid-cols-2">
      <section className="on-green flex flex-col justify-between bg-green px-6 py-10 text-ivory md:px-12">
        <Logo ink="#F6F7F3" className="h-auto w-40" />
        <div>
          <p className="eyebrow">Studio desk</p>
          <h1 className="display mt-4 text-4xl sm:text-5xl">The day, kept in one place.</h1>
          <span className="rule mt-6" />
          <p className="mt-6 max-w-sm text-ivory/80">
            Briefs, the book, the clients, and the run sheet. One book for the studio, not one book per browser.
          </p>
        </div>
        <p className="ui text-xs tracking-[0.16em] uppercase text-ivory/70">Addis Ababa</p>
      </section>
      <section className="flex items-center px-6 py-12 md:px-16">
        <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
          <p className="eyebrow">A seat</p>
          <h2 className="display mt-3 text-3xl text-green">Open the desk.</h2>
          <label className="field mt-8">
            <span>Email</span>
            <input
              type="email"
              value={email}
              autoComplete="username"
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
          </label>
          <label className="field mt-4">
            <span>Password</span>
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
            {error ? <p className="error">{error}</p> : null}
          </label>
          <button type="submit" className="btn btn-solid mt-6" disabled={pending}>
            {pending ? "Opening" : "Enter"}
          </button>
        </form>
      </section>
    </main>
  );
}
