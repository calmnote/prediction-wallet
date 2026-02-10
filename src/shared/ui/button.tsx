"use client";

import * as React from "react";
import { motion } from "framer-motion";

type MotionButtonProps = React.ComponentPropsWithoutRef<typeof motion.button>;

type ButtonProps = Omit<MotionButtonProps, "children"> & {
  variant?: "primary" | "secondary";
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
};

export const Button = ({
  variant = "primary",
  leftIcon,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-1.75 text-sm cursor-pointer";

  const styles =
    variant === "primary"
      ? "bg-brand-orange text-white hover:brightness-95"
      : "bg-primary text-black hover:brightness-95 border border-primary-border";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ scale: 0.98 }}
      drag={false}
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      {leftIcon ? (
        <span className="inline-flex shrink-0 items-center justify-center">
          {leftIcon}
        </span>
      ) : null}
      {children}
    </motion.button>
  );
};
