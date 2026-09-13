'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createWalletClient, custom, publicActions, WalletClient, Address, PublicClient, createPublicClient, http } from 'viem';
import { bsc } from 'viem/chains';

export const bscPublicClient = createPublicClient({
  chain: bsc,
  transport: http('https://bsc-dataseed.binance.org/')
});

interface Web3ContextType {
  address: Address | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  client: (WalletClient & PublicClient) | null;
  publicClient: PublicClient;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export const useWeb3 = () => useContext(Web3Context);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<Address | null>(null);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) setAddress(accounts[0] as Address);
        else setAddress(null);
      };
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      return () => (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }
  }, []);

  const connect = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      alert("Please install MetaMask or a Web3 wallet");
      return;
    }
    try {
      const walletClient = createWalletClient({
        chain: bsc,
        transport: custom((window as any).ethereum)
      }).extend(publicActions);
      
      const [address] = await walletClient.requestAddresses();
      await walletClient.switchChain({ id: bsc.id }).catch(() => {});
      
      setClient(walletClient);
      setAddress(address);
    } catch (e) {
      console.error(e);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setClient(null);
  };

  return (
    <Web3Context.Provider value={{ address, isConnected: !!address, connect, disconnect, client, publicClient: bscPublicClient }}>
      {children}
    </Web3Context.Provider>
  );
}
