"use client";

import { Button } from "@/shared/ui/button";
import { DepositIcon } from "@/shared/ui/icons/deposit-icon";
import { WithdrawIcon } from "@/shared/ui/icons/withdraw-icon";

type WalletActionsProps = {
  onDeposit: () => void;
  onWithdraw: () => void;
};

export const WalletActions = ({
  onDeposit,
  onWithdraw,
}: WalletActionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="primary"
        leftIcon={<DepositIcon className="h-5 w-5" />}
        className="h-11 rounded-lg text-base font-medium"
        onClick={onDeposit}
      >
        Deposit
      </Button>

      <Button
        variant="secondary"
        leftIcon={<WithdrawIcon className="h-5 w-5" />}
        className="h-11 rounded-lg text-base font-medium"
        onClick={onWithdraw}
      >
        Withdraw
      </Button>
    </div>
  );
};
