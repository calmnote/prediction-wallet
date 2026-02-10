import * as React from "react";
import clsx from "clsx";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1";
};

export const Heading = ({ as = "h1", className, ...props }: HeadingProps) => {
  const Comp = as;
  return (
    <Comp
      className={clsx(
        "text-black",
        as === "h1" && "text-[40px] tracking-[-0.8px] leading-12.75",
        className,
      )}
      {...props}
    />
  );
};
