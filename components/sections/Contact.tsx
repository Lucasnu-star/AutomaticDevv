import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { whatsappUrl, instagramUrl } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contacto" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <GlowCard>
              <ContactForm
                labels={{
                  name: t("form.name"),
                  email: t("form.email"),
                  message: t("form.message"),
                  submit: t("form.submit"),
                  sending: t("form.sending"),
                  success: t("form.success"),
                  error: t("form.error"),
                }}
              />
            </GlowCard>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-center gap-4">
              <p className="text-sm font-semibold tracking-widest text-muted uppercase">
                {t("or")}
              </p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-electric/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-cyan">
                  <MessageCircle className="h-6 w-6 text-white" />
                </span>
                <span className="font-semibold">{t("whatsapp")}</span>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-violet/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-electric">
                  <InstagramIcon className="h-6 w-6 text-white" />
                </span>
                <span className="font-semibold">{t("instagram")}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
