"use client";

import { PenIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/typography/text";

type WalletHeaderProps = {
  title?: string;
  joinedText?: string;
};

export const WalletHeader = ({
  title = "My Wallet",
  joinedText = "Joined Nov 2025",
}: WalletHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange" />

        <div className={"flex flex-col h-10"}>
          <div className="flex items-center gap-2">
            <Text size={"base"}>{title}</Text>
            <PenIcon />
          </div>
          <Text size={"xs"} tone={"secondary"} className={"mt-auto"}>
            {joinedText}
          </Text>
        </div>
      </div>
    </div>
  );
};
