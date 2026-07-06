"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={clsx(
        "group relative rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-violet/50 hover:shadow-glow",
        className
      )}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );
}
