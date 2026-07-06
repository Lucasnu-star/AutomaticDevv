import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/site";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-40 pb-28 sm:pt-48 sm:pb-36"
    >
      <div className="bg-circuit absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-electric/25 blur-[120px]" />
      <div className="absolute top-20 right-0 h-[380px] w-[380px] rounded-full bg-violet/25 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
        <Reveal>
          <span className="mb-6 inline-block rounded-full border border-violet/30 bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-light">
            {t("eyebrow")}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-heading text-4xl leading-[1.1] font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")}
            <br />
            <span className="text-gradient-brand">{t("titleHighlight")}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={whatsappUrl(t("whatsappMessage"))}>
              {t("ctaWhatsapp")}
            </Button>
            <Button href="#portfolio" variant="outline">
              {t("ctaPortfolio")}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
