import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section id="proceso" className="relative bg-surface/30 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-8 left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-violet/40 to-transparent lg:block" />
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.12}
              className="relative text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-violet/40 bg-background shadow-glow-sm">
                <span className="font-heading text-gradient-brand text-2xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-heading mt-5 text-lg font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
