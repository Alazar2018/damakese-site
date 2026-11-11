import type { Metadata } from "next";
import { PracticeView } from "@/components/practice-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "Damakese plans and produces conferences, state occasions, concerts, exhibitions, trade fairs, launches and activations, end to end.",
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
