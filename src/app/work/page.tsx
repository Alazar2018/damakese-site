import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/interior-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkArchive } from "@/components/work-archive";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Film, campaigns, and events by Damakese Marketing & Events. A client’s name goes on the work when the day can carry it.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <InteriorHero
          crumb="Work"
          title="work"
          line="Film, campaigns, and the days themselves."
          image={frames.concert}
          imageAlt="A concert crowd under stage light."
        />
        <WorkArchive />
        <section className="on-green bg-green text-ivory">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-12 md:py-20">
            <h2 className="display max-w-2xl text-4xl md:text-5xl">
              Your brief, <span className="text-lime">next.</span>
            </h2>
            <Link href="/inquire" className="btn bg-lime text-green hover:bg-ivory">
              Let&apos;s talk
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
