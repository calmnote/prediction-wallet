# Prediction (wallet card) — Test task


Implemented:
- Wallet card (USDC balance)
- PnL card with range tabs, interactive chart hover, and metrics
- Deposit / Withdraw flows
- **All external requests are executed via Server Actions**
- Server-side caching (**60s**) per `publicKey + range`

---

## Features

### Wallet
- Fetches ERC-20 balance (USDC) via Etherscan API
- Displays:
    - Balance (USDC)

### PnL
- Fetches wallet transfer history and builds PnL series
- Range tabs: `1h / 6h / 1d / 1w / 1m / all`
- Chart hover shows point date/time and value
- Values are animated with NumberFlow

### Deposit
- Shows deposit target address
- Can check deposits by parsing ERC-20 transfers

### Withdraw
- Sends ERC-20 transfer from the configured wallet (private key stored in `.env`)
- Polls tx status until success/error
- Updates local balance after confirmation

---

## Tech Stack

- next.js 
- typeScript
- bun
- @tailwindcss
- framer-motion
- recharts
- @number-flow/react
- etherscan API 
- public RPC endpoint

---

## Getting Started

### 1) Install dependencies

```bash
bun install
```
### 2) Environment variables
Create .env from .env.example:

```bash
cp .env.example .env
```

### 3) Run development server

```bash
bun dev
```

### Environment (.env.example)

```bash
# Etherscan, RPC
ETHERSCAN_API_URL=https://api.etherscan.io/v2/api
ETH_RPC_URL=https://ethereum-rpc.publicnode.com
ETHERSCAN_API_KEY=

# Wallet, chain (mainnet/sepolia)
CHAIN_ID=1
WALLET_PRIVATE_KEY=
PUBLIC_KEY=
PNL_NEGATIVE_TO_ADDRESS=

# Token config (for example: USDC)
TOKEN_ADDRESS=
TOKEN_DECIMALS=6

# Deposit 
DEPOSIT_TARGET=
```

### Architecture (FSD)
```	
src/actions/
	Server Actions only
	All external requests: tx status, tx list, deposit, withdraw
src/widgets/
	Feature-level UI blocks (WalletCard, PnlCard)
src/features/
	User flows (Deposit/Withdraw modals)
src/entities/
	State management (wallet store)
src/shared/
	Reusable UI, libs, config, types, formattin
```
