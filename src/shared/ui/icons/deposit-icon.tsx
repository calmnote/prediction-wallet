import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const DepositIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M3.33334 10C3.33334 13.6819 6.31811 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 3.33334L10 11.6667M10 11.6667L12.5 9.16667M10 11.6667L7.5 9.16667"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
