import { getTranslations } from "next-intl/server";
import { Bot, Globe2, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function Services() {
  const t = await getTranslations("services");
  const automationItems = t.raw("automation.items") as string[];
  const webItems = t.raw("web.items") as string[];

  const blocks = [
    {
      icon: Bot,
      tag: t("automation.tag"),
      title: t("automation.title"),
      description: t("automation.description"),
      items: automationItems,
      accent: "from-electric to-cyan",
    },
    {
      icon: Globe2,
      tag: t("web.tag"),
      title: t("web.title"),
      description: t("web.description"),
      items: webItems,
      accent: "from-violet to-electric",
    },
  ];

  return (
    <section id="servicios" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {blocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.15}>
              <GlowCard className="h-full p-8">
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${block.accent}`}
                >
                  <block.icon className="h-7 w-7 text-white" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-violet-light uppercase">
                  {block.tag}
                </span>
                <h3 className="font-heading mt-2 text-2xl font-bold">
                  {block.title}
                </h3>
                <p className="mt-3 text-muted">{block.description}</p>
                <ul className="mt-6 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-electric-light" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
