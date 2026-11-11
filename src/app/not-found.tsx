import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main id="content" className="on-green flex min-h-screen flex-col justify-center bg-green px-5 text-ivory">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 max-w-xl text-5xl">This page is not on the book.</h1>
      <span className="rule mt-6" />
      <Link href="/" className="btn btn-inverse mt-8 w-fit">
        Back to the day
      </Link>
    </main>
  );
}
