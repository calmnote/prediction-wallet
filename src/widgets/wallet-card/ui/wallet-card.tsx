"use client";

import { WalletHeader } from "./wallet-header";
import { WalletStats } from "./wallet-stats";
import { WalletActions } from "./wallet-actions";
import { PnlRow } from "@/widgets/wallet-card/ui/pnl-row";
import { Heading } from "@/shared/ui/typography/heading";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";

type WalletCardProps = {
  loading: boolean;
  balance: bigint | string;
};

export const WalletCard = ({ loading, balance }: WalletCardProps) => {
  return (
    <Card className="flex flex-col gap-4.5 w-full max-w-159.75 p-5">
      <CardHeader>
        <WalletHeader />
        <WalletStats portfolioNotUsdc="$3,361.42" usdcPlusPortfolio="$0,01" />
      </CardHeader>

      <CardContent>
        <Heading as={"h1"}>{loading ? "—" : `${balance} USDC`}</Heading>
        <PnlRow value={23.43} percent={5.2} periodLabel="Today" trend="up" />
      </CardContent>
      <WalletActions onDeposit={() => {}} onWithdraw={() => {}} />
    </Card>
  );
};
