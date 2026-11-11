import type { Metadata } from "next";
import { Montserrat, Source_Serif_4 } from "next/font/google";
import { DeskProvider } from "@/lib/store";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  "Damakese is an event production company in Addis Ababa. Conferences, state occasions, concerts, exhibitions, trade fairs, and product launches, planned and produced by one crew.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Event production in Addis Ababa",
    template: "%s · Damakese",
  },
  description,
  applicationName: "Damakese",
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: siteUrl,
    siteName: "Damakese Marketing & Events",
    title: "Damakese · Event production in Addis Ababa",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Damakese · Event production in Addis Ababa",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${sourceSerif.variable} h-full`}>
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
              url: siteUrl,
              description,
              areaServed: { "@type": "City", name: "Addis Ababa" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Addis Ababa",
                addressCountry: "ET",
              },
              knowsAbout: [
                "Conference production",
                "Concert production",
                "State occasions",
                "Exhibitions and trade fairs",
                "Product launches",
              ],
            }),
          }}
        />
        <DeskProvider>{children}</DeskProvider>
      </body>
    </html>
  );
}
