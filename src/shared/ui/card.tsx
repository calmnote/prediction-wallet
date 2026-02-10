import * as React from "react";
import clsx from "clsx";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section";
};

export const Card = ({ as = "section", className, ...props }: CardProps) => {
  const Comp = as;
  return (
    <Comp
      className={clsx(
        "rounded-lg bg-white border border-secondary-border shadow-sm",
        className,
      )}
      {...props}
    />
  );
};

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx("flex items-start justify-between gap-6", className)}
      {...props}
    />
  );
};

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx(className)} {...props} />;
};
