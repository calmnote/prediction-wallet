import * as React from "react";
import clsx from "clsx";

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  tone?: "primary" | "secondary" | "positive" | "negative";
  size?: "xs" | "sm" | "base";
};

export const Text = ({
  tone = "primary",
  size = "base",
  className,
  ...props
}: TextProps) => {
  return (
    <p
      className={clsx(
        size === "xs" && "text-xs tracking-[-0.24px] leading-3.75",
        size === "sm" && "text-sm font-medium tracking-[-0.28px] leading-4.5",
        size === "base" && "text-base font-medium tracking-[-0.32px] leading-5",
        tone === "primary" && "text-black",
        tone === "secondary" && "text-secondary",
        tone === "positive" && "text-positive",
        tone === "negative" && "text-red",
        className,
      )}
      {...props}
    />
  );
};
