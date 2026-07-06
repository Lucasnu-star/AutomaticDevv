"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";
import { GlowCard } from "@/components/ui/GlowCard";

type Category = "AUTOMATION" | "WEB";

type Project = {
  id: string;
  title: string;
  description: string;
  category: Category;
  images: string[];
  link: string | null;
};

type Filter = "ALL" | Category;

export function PortfolioGrid({
  projects,
  labels,
}: {
  projects: Project[];
  labels: {
    all: string;
    automation: string;
    web: string;
    empty: string;
    viewProject: string;
  };
}) {
  const [filter, setFilter] = useState<Filter>("ALL");

  const filtered = projects.filter(
    (p) => filter === "ALL" || p.category === filter
  );

  const tabs: { key: Filter; label: string }[] = [
    { key: "ALL", label: labels.all },
    { key: "AUTOMATION", label: labels.automation },
    { key: "WEB", label: labels.web },
  ];

  return (
    <div className="mt-14">
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={clsx(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
              filter === tab.key
                ? "shadow-glow-sm border-transparent bg-gradient-to-r from-electric to-violet text-white"
                : "border-border text-muted hover:border-violet/50 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <GlowCard
                key={project.id}
                className="flex flex-col overflow-hidden !p-0"
              >
                <div className="relative h-48 w-full overflow-hidden bg-surface">
                  {project.images[0] ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : null}
                  <span
                    className={clsx(
                      "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white",
                      project.category === "AUTOMATION"
                        ? "bg-electric/90"
                        : "bg-violet/90"
                    )}
                  >
                    {project.category === "AUTOMATION"
                      ? labels.automation
                      : labels.web}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted">
                    {project.description}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-light hover:text-cyan"
                    >
                      {labels.viewProject} <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </GlowCard>
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center text-muted"
          >
            {labels.empty}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
