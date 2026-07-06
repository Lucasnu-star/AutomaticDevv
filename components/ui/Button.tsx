"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-electric to-violet text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5",
  outline:
    "border border-violet/40 text-foreground hover:border-violet hover:bg-violet/10",
  ghost: "text-muted hover:text-foreground",
};

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

export function Button({
  variant = "primary",
  children,
  className,
  href,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: 0.97 }}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
