import Link from "next/link";

export function InteriorHero({
  crumb,
  title,
  line,
  image,
  imageAlt,
}: {
  crumb: string;
  title: string;
  line: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <header className="relative min-h-[62vh] overflow-hidden bg-green text-ivory">
      <img src={image} alt={imageAlt} className="hero-still absolute inset-0 h-full w-full object-cover object-[center_40%]" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8, 22, 14, 0.72) 0%, rgba(8, 22, 14, 0.28) 40%, rgba(8, 22, 14, 0.8) 100%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[62vh] max-w-[90rem] flex-col justify-end px-5 pt-28 pb-10 md:px-12 md:pb-14">
        <p className="ui text-[13px] font-semibold tracking-[0.14em] uppercase">
          <Link href="/" className="text-ivory/65">
            Home
          </Link>
          <span aria-hidden className="mx-3 inline-block h-1.5 w-1.5 rotate-45 bg-lime shadow-[0_0_12px_rgba(156,202,59,0.85)]" />
          <span className="text-lime">{crumb}</span>
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-montserrat)] text-[clamp(3.2rem,8vw,5.35rem)] leading-[0.92] font-extrabold tracking-[-0.03em] text-ivory lowercase">
          {title}
        </h1>
        <span className="rule rule-lime mt-5" />
        <p className="mt-4 max-w-2xl text-2xl font-medium text-ivory">{line}</p>
      </div>
    </header>
  );
}
