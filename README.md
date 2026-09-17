# Arbitrage Inception — Earn & Vaults

[![CI](https://github.com/Lukecele/arbitrage-inc-earn/actions/workflows/ci.yml/badge.svg)](https://github.com/Lukecele/arbitrage-inc-earn/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Network: BSC](https://img.shields.io/badge/Network-BNB_Smart_Chain-F0B90B?logo=binance&logoColor=white)](https://bscscan.com)
[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![KyberSwap](https://img.shields.io/badge/Router-KyberSwap_ZaaS-2CB680)](https://kyberswap.com)
[![DeFi: Vaults](https://img.shields.io/badge/DeFi-Yield_Vaults-F3BA2F)](#)

A multi-protocol yield aggregator and vault manager on BNB Smart Chain, designed to streamline entry into top DeFi yield strategies.

**Live Application:** [https://arbitrage-inc-earn.vercel.app](https://arbitrage-inc-earn.vercel.app)  
**Main Platform:** [https://arbitrage-inc.exchange](https://arbitrage-inc.exchange)  
**License:** [MIT](./LICENSE)

---

## Architecture & Yield Topology

```mermaid
flowchart LR
    User(["User Wallet<br>(BNB or any ERC-20)"]) --> Kyber["KyberSwap Aggregator API<br>(Optimal Route Calculation)"]
    Kyber --> Zap["Zap Execution Flow<br>(Viem / Wagmi Single Tx)"]
    
    subgraph YieldVaults ["Target Protocols (BNB Chain)"]
        Zap --> Lista["Lista DAO (slisBNB)<br>Liquid Staking Yield"]
        Zap --> PStake["pSTAKE Finance (stkBNB)<br>Auto-Compounding Rewards"]
        Zap --> Stader["Stader Labs (BNBx)<br>Liquid Staking APR"]
        Zap --> Venus["Venus Protocol (vTokens)<br>Lending Money Market Supply"]
    end
```

---

## Overview

Arbitrage Inception Vaults aggregates prominent yield-bearing protocols on BNB Chain into a single non-custodial interface. Through direct integration with the **KyberSwap Aggregation API**, users can deposit into liquid staking and lending positions using native BNB or any supported token with automated route calculation and single-transaction execution.

### Key Capabilities:
- **DeFi "Zap" Composition:** Single-action swap and deposit. Converts any input token to the required vault underlying asset before executing contract calls.
- **Lending Markets Interaction:** Direct supply and mint calls to **Venus Protocol** money market contracts (`vTokenAbi`, `vUSDT`, `vUSDC`).
- **Liquid Staking Integration:** Seamless staking flows for **Lista DAO**, **pSTAKE Finance**, and **Stader Labs**.
- **Modern EVM Tooling:** Built using **Viem** and **Wagmi v2** for type-safe contract calls, fast RPC state reconciliation, and minimal bundle footprint.

---

## Supported Protocols & Vaults

- **Liquid Staking:**
  - **Lista DAO** (`slisBNB`): Liquid staked BNB earning protocol staking yields.
  - **pSTAKE Finance** (`stkBNB`): Auto-compounding BNB staking rewards.
  - **Stader Labs** (`BNBx`): Liquid staking with automated compound rewards.
- **Lending Markets:**
  - **Venus Protocol** (`vUSDT`, `vUSDC`): Decentralized money market supply with automated swap and deposit logic.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Web3 Layer:** Wagmi 2, Viem 2, React Query 5 (type-safe RPC state management)
- **Routing & Execution:** KyberSwap Aggregator API v1 (quote fetching, route building, fee collection)
- **Styling & UI:** Tailwind CSS, Lucide Icons, Framer Motion
- **Deployment:** Vercel Edge / Serverless

---

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lukecele/arbitrage-inc-earn.git
   cd arbitrage-inc-earn
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## ⚖️ Open-Source Architecture & Regulatory Notice (MiCA Recital 22)

This repository contains free, open-source client software (MIT License) developed and maintained by independent open-source software engineers and researchers.

- **Non-Custodial Client:** This software functions strictly as a graphical user interface (GUI) and route aggregator for interacting with third-party decentralized liquidity protocols on BNB Smart Chain (KyberSwap, Venus Protocol, Lista DAO, pSTAKE, Stader Labs). It does not hold custody of user funds, operate a centralized exchange, or provide custodial financial services.
- **MiCA Exemption (Recital 22):** Under **Regulation (EU) 2023/1114 (Markets in Crypto-Assets - MiCA)**, fully decentralized peer-to-peer crypto-asset services provided without intermediaries fall outside the scope of crypto-asset service regulations.
- **Yield & Risk Notice:** Displayed APY values are third-party on-chain estimates derived from target protocol smart contracts and are not guaranteed returns.

---

## License

Released under the [MIT License](./LICENSE).
