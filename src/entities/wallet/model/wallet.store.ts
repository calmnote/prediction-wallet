import { create } from "zustand";

type WalletProfile = {
  username: string;
  avatarUrl?: string;
  joinedAt?: number;
};

type WalletState = {
  balance: number;
  profile: WalletProfile;

  setBalance: (v: number) => void;
  applyWithdraw: (amount: number) => void;
  applyDeposit: (amount: number) => void;

  setProfile: (p: Partial<WalletProfile>) => void;
  setUsername: (username: string) => void;
  setAvatarUrl: (avatarUrl?: string) => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  profile: {
    username: "My Wallet",
    avatarUrl: undefined,
    joinedAt: Date.now(),
  },

  setBalance: (v) => set({ balance: v }),
  applyWithdraw: (amount) =>
    set((s) => ({ balance: Math.max(0, s.balance - amount) })),
  applyDeposit: (amount) => set((s) => ({ balance: s.balance + amount })),

  setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
  setUsername: (username) =>
    set((s) => ({ profile: { ...s.profile, username } })),
  setAvatarUrl: (avatarUrl) =>
    set((s) => ({ profile: { ...s.profile, avatarUrl } })),
}));
