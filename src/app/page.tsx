import { getWalletSummary } from "@/actions/get-wallet-summary";
import { WalletCard } from "@/widgets/wallet-card/ui/wallet-card";
import { formatUnits } from "viem";
import { PnlCard } from "@/widgets/pnl-card/ui/pnl-card";

export default async function Home() {
  const data = await getWalletSummary();
  const raw = BigInt(data.rawBalance);
  const humanStr = formatUnits(raw, data.decimals);

  const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  const balance = nf.format(Number(humanStr));

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 bg-zinc-50 font-sans dark:bg-black">
      <WalletCard balance={balance} loading={false} />
      <PnlCard />
    </div>
  );
}
