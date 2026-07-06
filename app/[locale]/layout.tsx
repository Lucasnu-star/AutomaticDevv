import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Space_Grotesk, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://automaticdev.cloud";
  const isEs = locale === "es";

  const title = isEs
    ? "AutomaticDev — Automatización con IA y desarrollo web"
    : "AutomaticDev — AI Automation & Web Development";

  const description = isEs
    ? "Automatizamos tu negocio con inteligencia artificial y creamos páginas web profesionales. Bots de WhatsApp, flujos de trabajo, integraciones y sitios que convierten."
    : "We automate your business with AI and build professional websites. WhatsApp bots, workflows, integrations and sites that convert.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | AutomaticDev",
    },
    description,
    keywords: [
      "automatizacion con IA",
      "automatizacion WhatsApp",
      "creacion de paginas web",
      "desarrollo web Argentina",
      "chatbots IA",
      "AutomaticDev",
    ],
    alternates: {
      canonical: isEs ? "/" : "/en",
      languages: { es: "/", en: "/en" },
    },
    openGraph: {
      title: "AutomaticDev",
      description,
      url: isEs ? siteUrl : `${siteUrl}/en`,
      siteName: "AutomaticDev",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      locale: isEs ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "AutomaticDev",
      description,
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
