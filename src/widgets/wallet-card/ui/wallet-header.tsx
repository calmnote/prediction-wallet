"use client";

import Image from "next/image";
import { PenIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/typography/text";
import { useWalletStore } from "@/entities/wallet/model/wallet.store";

type WalletHeaderProps = {
  joinedText?: string;
};

export const WalletHeader = ({
  joinedText = "Joined Nov 2025",
}: WalletHeaderProps) => {
  const username = useWalletStore((s) => s.profile.username);
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex items-start gap-3">
        <Image
          src="/avatar.png"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className={"flex flex-col h-10"}>
          <div className="flex items-center gap-2">
            <Text size={"base"}>{username}</Text>
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
