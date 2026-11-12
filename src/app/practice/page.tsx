import type { Metadata } from "next";
import { PracticeView } from "@/components/practice-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Event services in Ethiopia",
  description:
    "Damakese Events produces conferences, concerts, state occasions, exhibitions and product launches in Ethiopia. Concept, crew, and the day itself.",
  alternates: { canonical: "/practice" },
};

export default function PracticePage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <PracticeView />
      </main>
      <SiteFooter />
    </>
  );
}
