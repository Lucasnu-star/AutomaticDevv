"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/site";

const NAV_ITEMS = [
  { href: "#servicios", key: "services" },
  { href: "#beneficios", key: "benefits" },
  { href: "#portfolio", key: "portfolio" },
  { href: "#proceso", key: "process" },
  { href: "#contacto", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-lg">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/icon-mark.png"
            alt="AutomaticDev"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg"
            priority
          />
          <span className="font-heading text-lg font-bold">
            automáticc
            <span className="text-gradient-brand">dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center overflow-hidden rounded-full border border-border text-xs font-semibold">
            <button
              onClick={() => switchLocale("es")}
              className={`px-3 py-1.5 transition-colors ${
                locale === "es"
                  ? "bg-violet/20 text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => switchLocale("en")}
              className={`px-3 py-1.5 transition-colors ${
                locale === "en"
                  ? "bg-violet/20 text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>
          <Button href={whatsappUrl()} className="!py-2.5">
            {t("contactCta")}
          </Button>
        </div>

        <button
          className="text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-muted hover:bg-surface hover:text-foreground"
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between px-3">
                <div className="flex items-center overflow-hidden rounded-full border border-border text-xs font-semibold">
                  <button
                    onClick={() => switchLocale("es")}
                    className={`px-3 py-1.5 ${locale === "es" ? "bg-violet/20 text-foreground" : "text-muted"}`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => switchLocale("en")}
                    className={`px-3 py-1.5 ${locale === "en" ? "bg-violet/20 text-foreground" : "text-muted"}`}
                  >
                    EN
                  </button>
                </div>
                <Button href={whatsappUrl()} className="!py-2">
                  {t("contactCta")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
