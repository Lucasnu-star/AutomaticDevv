import clsx from "clsx";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-block rounded-full border border-violet/30 bg-violet/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-light">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-muted">{subtitle}</p>}
    </Reveal>
  );
}
