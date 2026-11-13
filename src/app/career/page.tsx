import type { Metadata } from "next";
import { CareerBoard } from "@/components/career-board";
import { InteriorHero } from "@/components/interior-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Career",
  description: "Roles at Damakese Marketing & Events in Addis Ababa: production, creative, and the live show.",
  alternates: { canonical: "/career" },
};

export default function CareerPage() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <InteriorHero
          crumb="Career"
          title="career"
          line="Seats to write for."
          image={frames.hall}
          imageAlt="An empty hall, ready for a crew."
        />
        <CareerBoard />
      </main>
      <SiteFooter />
    </>
  );
}
