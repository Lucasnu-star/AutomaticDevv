import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { whatsappUrl, instagramUrl } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-surface/40 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <Image
              src="/icon-mark.png"
              alt="AutomaticDev"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg"
            />
            <div>
              <p className="font-heading font-bold">
                automáticc<span className="text-gradient-brand">dev</span>
              </p>
              <p className="mt-0.5 max-w-xs text-xs text-muted">
                {t("tagline")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-electric/60 hover:text-electric-light"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-violet/60 hover:text-violet-light"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} AutomaticDev. {t("rights")}
          </p>
          <Link href="/admin/login" className="hover:text-foreground">
            {t("admin")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
