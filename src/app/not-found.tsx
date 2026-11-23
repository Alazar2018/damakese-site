import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/logo";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main id="content" className="on-green relative flex min-h-screen flex-col justify-center overflow-hidden bg-green px-5 text-ivory">
      <div className="weave pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <LogoMark className="pointer-events-none absolute top-24 right-6 h-24 w-24 text-lime/40 md:right-16 md:h-40 md:w-40" />
      <div className="relative">
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 max-w-xl text-5xl">This page is not on the book.</h1>
        <span className="rule mt-6" />
        <Link href="/" className="btn btn-inverse mt-8 w-fit">
          Back to the day
        </Link>
      </div>
    </main>
  );
}
