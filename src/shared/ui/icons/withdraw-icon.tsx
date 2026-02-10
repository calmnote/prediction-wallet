import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const WithdrawIcon = (props: IconProps) => {
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
        d="M3.33332 10C3.33332 13.6819 6.31809 16.6667 9.99999 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 11.6667L10 3.33333M10 3.33333L12.5 5.83333M10 3.33333L7.5 5.83333"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
