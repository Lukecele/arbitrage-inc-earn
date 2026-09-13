'use client';

import { useWeb3 } from './Web3Provider';
import { Wallet, LogOut, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';

export function CrossedInfinityLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="infGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="infGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 50) rotate(-30) translate(-50, -50)">
        <path d="M 33,50 C 18,35 15,65 33,50 C 51,35 51,65 67,50 C 83,35 85,65 67,50 C 51,35 51,65 33,50 Z" stroke="url(#infGrad1)" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g transform="translate(50, 50) rotate(45) translate(-50, -50)">
        <path d="M 33,50 C 18,35 15,65 33,50 C 51,35 51,65 67,50 C 83,35 85,65 67,50 C 51,35 51,65 33,50 Z" stroke="url(#infGrad2)" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.85" />
      </g>
    </svg>
  );
}

export function Navbar() {
  const { address, isConnected, connect, disconnect, publicClient } = useWeb3();
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    if (isConnected && publicClient && address) {
      publicClient.getBalance({ address }).then((b: any) => setBalance(formatEther(b)));
    }
  }, [isConnected, publicClient, address]);

  return (
    <nav className="border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="https://arbitrage-inc.exchange" target="_blank" rel="noreferrer" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
          <CrossedInfinityLogo className="w-8 h-8 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors uppercase">
            Arbitrage <span className="text-emerald-400">Inception</span>
          </span>
        </a>
        
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/5 text-sm font-mono text-slate-300">
              <span>{parseFloat(balance).toFixed(4)} BNB</span>
            </div>
          )}
          
          {isConnected ? (
            <button 
              onClick={() => disconnect()}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
            >
              <span>{address?.slice(0,6)}...{address?.slice(-4)}</span>
              <LogOut className="w-4 h-4 text-slate-400" />
            </button>
          ) : (
            <button 
              onClick={() => connect()}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2 rounded-lg transition-colors font-semibold text-sm"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
