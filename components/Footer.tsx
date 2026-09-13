export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-8 px-4 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-300">Arbitrage Inception — Earn & Vaults</p>
          <p className="mt-1 text-slate-500 max-w-xl leading-relaxed">
            Non-custodial, open-source client interface (MIT License) routing through KyberSwap Aggregator and public BNB Smart Chain protocol contracts.
            Displayed APY values are third-party on-chain estimates, not guaranteed returns.
            Pursuant to Recital 22 of Regulation (EU) 2023/1114 (MiCA), fully decentralized peer-to-peer interactions without financial custody fall outside crypto-asset service regulations.
          </p>
        </div>
        <div className="flex items-center gap-4 text-slate-400 flex-shrink-0">
          <a href="https://arbitrage-inc.exchange/terms-of-service" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Terms</a>
          <span>·</span>
          <a href="https://arbitrage-inc.exchange/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Privacy</a>
          <span>·</span>
          <a href="https://github.com/Lukecele/arbitrage-inc-earn" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">GitHub (MIT)</a>
        </div>
      </div>
    </footer>
  );
}
