import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Damakese Events | Events in Ethiopia" },
  description:
    "Damakese Events is an event company in Ethiopia. Conferences, concerts, state occasions, exhibitions and launches, produced from Addis Ababa.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeView />
    </>
  );
}
