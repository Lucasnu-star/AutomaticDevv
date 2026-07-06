import { getTranslations } from "next-intl/server";
import { TrendingUp, ShieldCheck, Clock, Infinity as InfinityIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = [TrendingUp, ShieldCheck, Clock, InfinityIcon];

export async function Benefits() {
  const t = await getTranslations("benefits");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="beneficios" className="relative bg-surface/30 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <GlowCard className="h-full text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-violet/30 bg-violet/10">
                    <Icon className="h-6 w-6 text-cyan" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {item.description}
                  </p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
