import type { Metadata } from "next";
import Link from "next/link";
import { ClientsWall } from "@/components/clients-wall";
import { InteriorHero } from "@/components/interior-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Who Damakese Marketing & Events works with: brands, live shows, institutions, and exhibitions in Addis Ababa and beyond.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <InteriorHero
          crumb="Clients"
          title="clients"
          line="The company we keep."
          image={frames.fair}
          imageAlt="An exhibition floor before the doors open."
        />
        <ClientsWall />
        <section className="on-green bg-green text-ivory">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-12 md:py-20">
            <div>
              <h2 className="display max-w-2xl text-4xl md:text-5xl">Your brand, in the room.</h2>
              <p className="mt-4 max-w-xl text-ivory/80">Every brief starts with what the work has to achieve.</p>
            </div>
            <Link href="/inquire" className="btn btn-inverse">
              Let&apos;s talk
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
