import type { Metadata } from "next";
import { Montserrat, Source_Serif_4 } from "next/font/google";
import { DeskProvider } from "@/lib/store";
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

export const metadata: Metadata = {
  title: {
    default: "Damakese Marketing & Events",
    template: "%s · Damakese",
  },
  description:
    "Damakese Marketing & Events plans and produces conferences, state occasions, concerts, exhibitions and trade fairs in Addis Ababa. Designing the moment. Delivering the day.",
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
        <DeskProvider>{children}</DeskProvider>
      </body>
    </html>
  );
}
