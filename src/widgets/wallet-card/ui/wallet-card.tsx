"use client";

import { WalletHeader } from "./wallet-header";
import { WalletStats } from "./wallet-stats";
import { WalletActions } from "./wallet-actions";
import { PnlRow } from "@/widgets/wallet-card/ui/pnl-row";
import { Heading } from "@/shared/ui/typography/heading";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { useEffect, useState } from "react";
import { DepositModal } from "@/features/deposit/ui/deposit-modal";
import { WithdrawModal } from "@/features/deposit/withdraw/ui/withdraw-modal";
import { useWalletStore } from "@/entities/wallet/model/wallet.store";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";

type WalletCardProps = {
  loading: boolean;
  balance: bigint | string;
};

export const WalletCard = ({ loading, balance }: WalletCardProps) => {
  const setBalance = useWalletStore((s) => s.setBalance);
  const userBalance = useWalletStore((s) => s.balance);

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  useEffect(() => {
    setBalance(Number(balance));
  }, [balance, setBalance]);

  return (
    <Card className="flex flex-col gap-4.5 w-full max-w-159.75 p-5">
      <CardHeader>
        <WalletHeader />
        <WalletStats portfolioNotUsdc="$3,361.42" usdcPlusPortfolio="$0,01" />
      </CardHeader>
      <CardContent>
        <Heading as="h1" className="flex items-baseline gap-2 h-12.75">
          {loading ? (
            "—"
          ) : (
            <NumberFlowGroup>
              <NumberFlow
                value={userBalance}
                locales="en-US"
                format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                className="text-[40px] tracking-[-0.8px]"
              />
            </NumberFlowGroup>
          )}
          <span className="text-[40px] tracking-[-0.8px]">USDC</span>
        </Heading>

        <PnlRow value={23.43} percent={5.2} periodLabel="Today" trend="up" />
      </CardContent>
      <DepositModal open={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
      />
      <WalletActions
        onDeposit={() => setDepositOpen(true)}
        onWithdraw={() => setWithdrawOpen(true)}
      />
    </Card>
  );
};
