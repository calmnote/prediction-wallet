"use client";

import { MoneyIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/typography/text";

type WalletStatsProps = {
  portfolioNotUsdc: string;
  usdcPlusPortfolio: string;
};

export const WalletStats = ({
  portfolioNotUsdc,
  usdcPlusPortfolio,
}: WalletStatsProps) => {
  return (
    <div className="flex items-center gap-7">
      <div className="text-center">
        <Text size={"xs"} tone={"secondary"}>
          Portfolio ( Not USDC )
        </Text>
        <Text className={"mt-1"} size={"base"}>
          {portfolioNotUsdc}
        </Text>
      </div>

      <div className="h-6 w-px bg-secondary-border" />

      <div className="text-center">
        <Text size={"xs"} tone={"secondary"}>
          USDC + Portfolio
        </Text>

        <Text
          size={"base"}
          tone={"primary"}
          className="flex items-center gap-1.5 mt-0.5"
        >
          <MoneyIcon />
          {usdcPlusPortfolio}
        </Text>
      </div>
    </div>
  );
};
