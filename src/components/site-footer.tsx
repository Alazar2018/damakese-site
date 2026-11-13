import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter({ line = true }: { line?: boolean }) {
  return (
    <footer className="bg-ivory text-green">
      <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-20">
        {line ? (
          <p className="display max-w-3xl text-4xl leading-[1.05] md:text-5xl">
            Designing the moment.
            <span className="mt-2 block">Delivering the day.</span>
          </p>
        ) : null}
        <div className={`grid gap-10 md:grid-cols-12 ${line ? "mt-14" : ""}`}>
          <div className="md:col-span-4">
            <Logo className="h-auto w-40" />
            <p className="mt-6 max-w-xs text-[1.05rem] leading-relaxed">
              Damakese Marketing & Events. Marketing, events and entertainment in Addis Ababa.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">The book</p>
            <ul className="mt-4 space-y-2">
              <li><Link className="ui inline-flex min-h-11 items-center text-sm hover:underline hover:decoration-lime hover:decoration-2 hover:underline-offset-4" href="/about">About</Link></li>
              <li><Link className="ui inline-flex min-h-11 items-center text-sm hover:underline hover:decoration-lime hover:decoration-2 hover:underline-offset-4" href="/practice">Services</Link></li>
              <li><Link className="ui inline-flex min-h-11 items-center text-sm hover:underline hover:decoration-lime hover:decoration-2 hover:underline-offset-4" href="/work">Work</Link></li>
              <li><Link className="ui inline-flex min-h-11 items-center text-sm hover:underline hover:decoration-lime hover:decoration-2 hover:underline-offset-4" href="/clients">Clients</Link></li>
              <li><Link className="ui inline-flex min-h-11 items-center text-sm hover:underline hover:decoration-lime hover:decoration-2 hover:underline-offset-4" href="/newsroom">Newsroom</Link></li>
              <li><Link className="ui inline-flex min-h-11 items-center text-sm hover:underline hover:decoration-lime hover:decoration-2 hover:underline-offset-4" href="/career">Career</Link></li>
              <li><Link className="ui inline-flex min-h-11 items-center text-sm hover:underline hover:decoration-lime hover:decoration-2 hover:underline-offset-4" href="/inquire">Let&apos;s talk</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">Where</p>
            <p className="mt-4 text-[1.05rem]">Addis Ababa, Ethiopia</p>
            <p className="mt-2 text-[1.05rem]">Nine years of industry experience across the team.</p>
            <Link className="ui mt-4 inline-block text-sm underline decoration-green decoration-2 underline-offset-4" href="/inquire">
              Let&apos;s talk
            </Link>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow">Desk</p>
            <Link className="ui mt-4 inline-block text-sm underline decoration-green decoration-2 underline-offset-4" href="/admin/login">
              Studio desk
            </Link>
          </div>
        </div>
        <p className="ui mt-14 text-xs tracking-[0.14em] uppercase text-forest">
          Volume One · 2026 · Damakese
        </p>
      </div>
    </footer>
  );
}
