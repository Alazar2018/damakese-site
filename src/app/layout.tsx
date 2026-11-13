import type { Metadata } from "next";
import { Montserrat, Source_Serif_4 } from "next/font/google";
import { DeskProvider } from "@/lib/store";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source",
  display: "swap",
});

const description =
  "Damakese Marketing & Events is a full-service marketing, events and entertainment company in Addis Ababa. Rooted in experience. Driven by creativity.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Damakese Marketing & Events",
    template: "%s · Damakese Marketing & Events",
  },
  description,
  applicationName: "Damakese Marketing & Events",
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: siteUrl,
    siteName: "Damakese Marketing & Events",
    title: "Damakese Marketing & Events | Events in Ethiopia",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Damakese Marketing & Events | Events in Ethiopia",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${montserrat.variable} ${sourceSerif.variable} h-full`}>
      <body className="min-h-full">
        <a
          href="#content"
          className="ui sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ivory focus:px-4 focus:py-3 focus:text-green"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Damakese Marketing & Events",
              alternateName: ["Damakese Events", "Damakese"],
              url: siteUrl,
              description,
              areaServed: [
                { "@type": "Country", name: "Ethiopia" },
                { "@type": "City", name: "Addis Ababa" },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Addis Ababa",
                addressCountry: "ET",
              },
              knowsAbout: [
                "Marketing and brand activations",
                "Branding and visual identity",
                "Event production",
                "Concerts and live entertainment",
              ],
            }),
          }}
        />
        <DeskProvider>{children}</DeskProvider>
      </body>
    </html>
  );
}
