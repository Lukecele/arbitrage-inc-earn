/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { useWeb3 } from './Web3Provider';
import { getRoute, buildRoute } from '@/lib/kyberswap';
import { erc20Abi, vTokenAbi } from '@/lib/abis';
import { Loader2, TrendingUp, ShieldCheck, ArrowDownUp, LogOut, CheckCircle2, ExternalLink } from 'lucide-react';
import { parseUnits, formatUnits, formatEther } from 'viem';

import { bsc } from 'viem/chains';

const NATIVE_BNB = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const USDC = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';

export const POOLS = [
  {
    id: 'lista',
    name: 'Lista DAO Liquid Staking',
    symbol: 'slisBNB',
    address: '0xb0b84d294e0c75a6abe60171b70edeb2efd14a1b',
    decimals: 18,
    type: 'Liquid Staking',
    apy: '8.2%',
    link: 'https://lista.org/',
    description: 'Stake BNB to receive slisBNB, auto-compounding staking yields.'
  },
  {
    id: 'stkbnb',
    name: 'pSTAKE Staked BNB',
    symbol: 'stkBNB',
    address: '0xc2e9d07f66a89c44062459a47a0d2dc038e4fb16',
    decimals: 18,
    type: 'Liquid Staking',
    apy: '4.8%',
    link: 'https://bnb.pstake.finance/',
    description: 'Stake BNB to receive stkBNB by pSTAKE Finance. Earns auto-compounding staking rewards.'
  },
  {
    id: 'bnbx',
    name: 'Stader BNBx',
    symbol: 'BNBx',
    address: '0x1bdd3cf7f79cfb8edbb955f20ad99211551ba275',
    decimals: 18,
    type: 'Liquid Staking',
    apy: '5.1%',
    link: 'https://www.staderlabs.com/bnb/liquid-staking/bnbx/',
    description: 'Stake BNB to receive BNBx by Stader Labs. Earns auto-compounding staking rewards.'
  },
  {
    id: 'venus-usdt',
    name: 'Venus USDT Lending',
    symbol: 'vUSDT',
    address: '0xfd5840cd36d94d7229439859c0112a4185bc0255',
    decimals: 8,
    type: 'Lending Vault',
    apy: '8.1%',
    link: 'https://app.venus.io/',
    description: 'Managed Vault: Automatically swaps BNB to USDT and supplies it to Venus Protocol to earn lending yield.',
    manager: 'venus',
    underlyingToken: '0x55d398326f99059ff775485246999027b3197955', // USDT
    underlyingDecimals: 18
  },
  {
    id: 'venus-usdc',
    name: 'Venus USDC Lending',
    symbol: 'vUSDC',
    address: '0xeca88125a5adbe82614ffc12d0db554e2e2867c8',
    decimals: 8,
    type: 'Lending Vault',
    apy: '9.4%',
    link: 'https://app.venus.io/',
    description: 'Managed Vault: Automatically swaps BNB to USDC and supplies it to Venus Protocol to earn lending yield.',
    manager: 'venus',
    underlyingToken: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
    underlyingDecimals: 18
  },
  {
    id: 'venus-btc',
    name: 'Venus BTCB Lending',
    symbol: 'vBTC',
    address: '0x882c173bc7ff3b7786ca16dfed3dfffb9ee7847b',
    decimals: 8,
    type: 'Lending Vault',
    apy: '1.2%',
    link: 'https://app.venus.io/',
    description: 'Managed Vault: Automatically swaps BNB to BTCB and supplies it to Venus Protocol.',
    manager: 'venus',
    underlyingToken: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', // BTCB
    underlyingDecimals: 18
  },
  {
    id: 'venus-eth',
    name: 'Venus ETH Lending',
    symbol: 'vETH',
    address: '0xf508fcd89b8bd15579dc79a6827cb4686a3592c8',
    decimals: 8,
    type: 'Lending Vault',
    apy: '1.8%',
    link: 'https://app.venus.io/',
    description: 'Managed Vault: Automatically swaps BNB to ETH and supplies it to Venus Protocol.',
    manager: 'venus',
    underlyingToken: '0x2170ed0880ac9a755fd29b2688956bd959f933f8', // ETH
    underlyingDecimals: 18
  },
  {
    id: 'venus-cake',
    name: 'Venus CAKE Auto-Lending Yield',
    symbol: 'vCAKE',
    address: '0x86ac3974e2bd0d60825230fa6f355ff11409df5c',
    decimals: 8,
    type: 'Defi Protocol',
    apy: '14.2%',
    link: 'https://app.venus.io/',
    description: 'High-speed auto-compounding protocol via Venus updated logic. Stakes CAKE for high multiplier lending yields.',
    manager: 'venus',
    underlyingToken: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // CAKE
    underlyingDecimals: 18
  }
];

export function Dashboard() {
  const { address, isConnected, connect } = useWeb3();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 mb-2 uppercase tracking-wide">
            Arbitrage Inception Vaults
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Powered by KyberSwap Aggregation API. Seamlessly enter and exit top yield-bearing positions on BNB Chain with automatic token conversion.
          </p>
        </div>
        <div className="flex justify-center sm:justify-start">
          <a
            href="https://arbitrage-inc.exchange"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl border border-emerald-500/10 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 text-sm font-semibold transition-colors uppercase tracking-wider flex items-center gap-2"
          >
            Visit arbitrage-inc.exchange
          </a>
        </div>
      </div>

      {!isConnected && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Public Vault Explorer (Read-Only Mode)</p>
              <p className="text-xs text-slate-400">
                Browsing active vaults and live APYs. Connect your Web3 wallet to deposit, withdraw, or track your real-time positions.
              </p>
            </div>
          </div>
          <button
            onClick={() => connect()}
            className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Connect Wallet
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {POOLS.map((pool) => (
          <PoolCard
            key={pool.id}
            pool={pool}
            userAddress={address}
            isConnected={isConnected}
            connect={connect}
          />
        ))}
      </div>

      {/* Footer Branding section */}
      <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold uppercase text-slate-400">Arbitrage Inception</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://arbitrage-inc.exchange"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-colors uppercase font-semibold tracking-wider"
          >
            Sito Principale ↗
          </a>
        </div>
      </footer>
    </main>
  );
}

function PoolCard({
  pool,
  userAddress,
  isConnected,
  connect
}: {
  pool: typeof POOLS[0];
  userAddress: `0x${string}` | null;
  isConnected: boolean;
  connect: () => void;
}) {
  const { client, publicClient } = useWeb3();
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<'enter' | 'exit'>('enter');
  const [amount, setAmount] = useState('');
  const [route, setRoute] = useState<any>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [tokenBalance, setTokenBalance] = useState('0');
  const [bnbBalance, setBnbBalance] = useState('0');
  const [usdcBalance, setUsdcBalance] = useState('0');

  const fetchBalances = async () => {
    if (!publicClient || !userAddress) {
      setBnbBalance('0');
      setUsdcBalance('0');
      setTokenBalance('0');
      return;
    }
    
    try {
      const bBalance = await publicClient.getBalance({ address: userAddress });
      setBnbBalance(formatEther(bBalance));
    } catch (e) {
      console.error("Error fetching BNB balance:", e);
      setBnbBalance('0');
    }
    
    try {
      const uBalance = await publicClient.readContract({
        address: USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [userAddress]
      }) as bigint;
      setUsdcBalance(formatUnits(uBalance, 18));
    } catch (e) {
      console.error("Error fetching USDC balance or token not present:", e);
      setUsdcBalance('0');
    }

    try {
      let tBalance: bigint | number = 0;
      const targetAddress = pool.address;
      if (targetAddress && targetAddress !== '' && targetAddress !== '0x0000000000000000000000000000000000000000') {
         tBalance = await publicClient.readContract({
           address: targetAddress as `0x${string}`,
           abi: erc20Abi,
           functionName: 'balanceOf',
           args: [userAddress]
         }) as bigint;
      }
      setTokenBalance(tBalance.toString());
    } catch (e) {
      console.error("Error fetching specific Token balance:", e);
      setTokenBalance('0');
    }
  };

  useEffect(() => {
    fetchBalances();
    const intv = setInterval(fetchBalances, 10000);
    return () => clearInterval(intv);
  }, [publicClient, userAddress]);

  const formattedTokenBalance = formatUnits(BigInt(tokenBalance), pool.decimals);
  const hasPosition = isConnected && BigInt(tokenBalance) > BigInt(0);

  const getUnderlyingSymbol = () => {
    if (pool.manager === 'venus') {
       return pool.symbol.replace('v', '');
    }
    return pool.symbol;
  };

  const fetchQuote = async (val: string) => {
    setAmount(val);
    if (!val || parseFloat(val) <= 0) {
      setRoute(null);
      return;
    }
    setLoadingRoute(true);
    setErrorMsg('');

    try {
      const isEnter = action === 'enter';
      let targetToken = pool.address;
      let targetDecimals = pool.decimals;

      if (pool.manager === 'venus') {
         targetToken = pool.underlyingToken!;
         targetDecimals = pool.underlyingDecimals!;
         
         if (!isEnter) {
             setRoute({ isManagedExit: true, amountOut: '0' });
             setLoadingRoute(false);
             return;
         }
      }

      let tokenIn = isEnter ? USDC : targetToken;
      let tokenOut = isEnter ? targetToken : USDC;

      if (tokenIn.toLowerCase() === tokenOut.toLowerCase()) {
         if (isEnter) tokenIn = NATIVE_BNB;
         else tokenOut = NATIVE_BNB; 
      }
      
      const decimalsIn = isEnter ? 18 : targetDecimals;
      let rawAmountBigInt = parseUnits(val, decimalsIn);

      // Smart balance/gas adaptation only when wallet is connected
      if (isEnter && isConnected && userAddress) {
         if (tokenIn === USDC) {
            const uBal = parseUnits(usdcBalance, 18);
            if (rawAmountBigInt > uBal && uBal > BigInt(0)) {
               rawAmountBigInt = uBal;
            }
         } else if (tokenIn === NATIVE_BNB) {
            const bBal = parseUnits(bnbBalance, 18);
            const gasReserve = parseUnits('0.005', 18);
            if (rawAmountBigInt + gasReserve > bBal && bBal > gasReserve) {
               rawAmountBigInt = bBal - gasReserve;
            }
         }
      } else if (!isEnter && isConnected && userAddress) {
         const tBal = BigInt(tokenBalance);
         if (rawAmountBigInt > tBal && tBal > BigInt(0)) {
            rawAmountBigInt = tBal;
         }
      }

      const rawAmount = rawAmountBigInt.toString();
      
      const data = await getRoute(tokenIn, tokenOut, rawAmount);
      if (data.code === 0) {
        setRoute({ 
          ...data.data.routeSummary, 
          isManagedEnter: pool.manager === 'venus',
        });
      } else {
        throw new Error(data.message || 'No route found');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch quote');
      setRoute(null);
    } finally {
      setLoadingRoute(false);
    }
  };

  const executeAction = async () => {
    if (!isConnected || !userAddress) {
      connect();
      return;
    }
    if (!route || !client || !publicClient) return;
    setExecuting(true);
    setErrorMsg('');

    try {
      const isEnter = action === 'enter';
      let targetToken = pool.address;
      if (pool.manager === 'venus') {
         targetToken = pool.underlyingToken!;
      }

      let tokenIn = isEnter ? USDC : targetToken;
      let tokenOut = isEnter ? targetToken : USDC;

      if (tokenIn.toLowerCase() === tokenOut.toLowerCase()) {
         if (isEnter) tokenIn = NATIVE_BNB;
         else tokenOut = NATIVE_BNB; 
      }

      // ---------------------------------
      // VENUS MANAGED VAULT FLOW
      // ---------------------------------
      if (pool.manager === 'venus') {
        if (isEnter) {
           const symbol = pool.symbol.replace('v', '');
           setErrorMsg(`Step 1/3: Swapping to ${symbol}...`);
           const buildRes = await buildRoute(route, userAddress, userAddress, 100);
           if (buildRes.code !== 0) throw new Error(buildRes.message);

           if (tokenIn !== NATIVE_BNB) {
             setErrorMsg('Approving input token for swap...');
             await client.writeContract({
               address: tokenIn as `0x${string}`,
               abi: erc20Abi,
               functionName: 'approve',
               args: [buildRes.data.routerAddress as `0x${string}`, BigInt(route.amountIn)],
               account: userAddress,
               chain: bsc
             });
             await new Promise(res => setTimeout(res, 5000));
           }

           await client.sendTransaction({
             to: buildRes.data.routerAddress as `0x${string}`,
             data: buildRes.data.data as `0x${string}`,
             value: tokenIn === NATIVE_BNB ? BigInt(route.amountIn) : BigInt(0),
             account: userAddress,
             chain: bsc
           });
           
           setErrorMsg(`Step 2/3: Approving ${symbol} to Venus...`);
           await new Promise(res => setTimeout(res, 6000));
           const underlyingBal = await publicClient.readContract({
             address: pool.underlyingToken as `0x${string}`,
             abi: erc20Abi,
             functionName: 'balanceOf',
             args: [userAddress]
           }) as bigint;

           await client.writeContract({
             address: pool.underlyingToken as `0x${string}`,
             abi: erc20Abi,
             functionName: 'approve',
             args: [pool.address as `0x${string}`, underlyingBal],
             account: userAddress,
             chain: bsc
           });

           setErrorMsg('Step 3/3: Supplying to Venus...');
           await new Promise(res => setTimeout(res, 6000));
           await client.writeContract({
             address: pool.address as `0x${string}`,
             abi: vTokenAbi,
             functionName: 'mint',
             args: [underlyingBal],
             account: userAddress,
             chain: bsc
           });
        } else {
           const symbol = pool.symbol.replace('v', '');
           setErrorMsg(`Burning vTokens (You will receive ${symbol})...`);
           await client.writeContract({
             address: pool.address as `0x${string}`,
             abi: vTokenAbi,
             functionName: 'redeem',
             args: [parseUnits(amount, pool.decimals) > BigInt(tokenBalance) ? BigInt(tokenBalance) : parseUnits(amount, pool.decimals)],
             account: userAddress,
             chain: bsc
           });
           await new Promise(res => setTimeout(res, 4000));

           setErrorMsg(`Step 2/3: Estimating swap to output token...`);
           const underlyingBal = await publicClient.readContract({
             address: pool.underlyingToken as `0x${string}`,
             abi: erc20Abi,
             functionName: 'balanceOf',
             args: [userAddress]
           }) as bigint;

           if (underlyingBal > BigInt(0)) {
               const routeData = await getRoute(pool.underlyingToken!, tokenOut, underlyingBal.toString());
               if (routeData.code !== 0) throw new Error(routeData.message || 'No route found');
               const buildRes = await buildRoute(routeData.data.routeSummary, userAddress, userAddress, 100);
               if (buildRes.code !== 0) throw new Error(buildRes.message);
               
               setErrorMsg(`Step 3/3: Executing Swap to output token...`);
               await client.writeContract({
                 address: pool.underlyingToken as `0x${string}`,
                 abi: erc20Abi,
                 functionName: 'approve',
                 args: [buildRes.data.routerAddress as `0x${string}`, underlyingBal],
                 account: userAddress,
                 chain: bsc
               });
               await new Promise(res => setTimeout(res, 5000));

               await client.sendTransaction({
                 to: buildRes.data.routerAddress as `0x${string}`,
                 data: buildRes.data.data as `0x${string}`,
                 value: BigInt(0),
                 account: userAddress,
                 chain: bsc
               });
           }
        }
      } 
      // ---------------------------------
      // STANDARD 1-STEP ROUTER FLOW
      // ---------------------------------
      else {
        const buildRes = await buildRoute(route, userAddress, userAddress, 100);
        if (buildRes.code !== 0) throw new Error(buildRes.message);
        const txData = buildRes.data;

        if (tokenIn !== NATIVE_BNB) {
          setErrorMsg('Approving router...');
          await client.writeContract({
            address: tokenIn as `0x${string}`,
            abi: erc20Abi,
            functionName: 'approve',
            args: [txData.routerAddress as `0x${string}`, BigInt(route.amountIn)],
            account: userAddress,
            chain: bsc
          });
          await new Promise(res => setTimeout(res, 5000));
        }

        setErrorMsg('Executing Swap...');
        await client.sendTransaction({
          to: txData.routerAddress as `0x${string}`,
          data: txData.data as `0x${string}`,
          value: tokenIn === NATIVE_BNB ? BigInt(route.amountIn) : BigInt(0),
          account: userAddress,
          chain: bsc
        });
      }
      
      setErrorMsg('');
      setAmount('');
      setRoute(null);
      setIsOpen(false);
      
      setTimeout(fetchBalances, 6000);
      
    } catch (err: any) {
      console.error(err);
      if (err?.message?.includes('User denied') || err?.message?.includes('rejected')) {
        setErrorMsg('Transaction was rejected in your wallet.');
      } else {
        setErrorMsg(err?.shortMessage || err?.message || 'Transaction failed.');
      }
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:bg-slate-900 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            {pool.name}
            {pool.link && (
              <a href={pool.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 mt-1 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{pool.type}</span>
            <span>{pool.symbol}</span>
            {pool.apy && <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">APY {pool.apy}</span>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500 mb-1">Your Position</div>
          <div className="font-mono text-lg font-semibold text-white">
            {isConnected ? parseFloat(formattedTokenBalance).toFixed(4) : '—'}
          </div>
        </div>
      </div>
      
      <p className="text-slate-400 text-sm mb-6 line-clamp-2">{pool.description}</p>

      {/* Basic Actions */}
      <div className="flex gap-3">
        <button 
          onClick={() => { setAction('enter'); setIsOpen(!isOpen); setAmount(''); setRoute(null); }}
          className="flex-1 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors flex justify-center items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Enter Position
        </button>
        <button 
          disabled={!hasPosition}
          onClick={() => { setAction('exit'); setIsOpen(!isOpen); setAmount(''); setRoute(null); }}
          className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/5 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Exit
        </button>
      </div>

      {isOpen && (() => {
         const isEnter = action === 'enter';
         let targetToken = pool.address;
         if (pool.manager === 'venus') targetToken = pool.underlyingToken!;
         
         let tokenIn = isEnter ? USDC : targetToken;
         let tokenOut = isEnter ? targetToken : USDC;

         if (tokenIn.toLowerCase() === tokenOut.toLowerCase()) {
            if (isEnter) tokenIn = NATIVE_BNB;
            else tokenOut = NATIVE_BNB; 
         }
         
         const inputSymbol = isEnter ? (tokenIn === USDC ? 'USDC' : 'BNB') : pool.symbol;
         const outputSymbol = isEnter ? pool.symbol : (tokenOut === USDC ? 'USDC' : 'BNB');

         let displayBalance = '0';
         if (isConnected) {
           if (action === 'enter') {
             displayBalance = tokenIn === USDC ? usdcBalance : bnbBalance;
           } else {
             displayBalance = formattedTokenBalance;
           }
         }

         return (
         <div className="mt-6 p-5 rounded-xl border border-white/5 bg-slate-950">
            <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
               <span>{action === 'enter' ? `Deposit ${inputSymbol}` : `Withdraw ${inputSymbol}`}</span>
               <div className="flex items-center gap-2">
                 <span>Balance: {isConnected ? parseFloat(displayBalance).toFixed(4) : '—'}</span>
                 {isConnected && (
                   <button
                     type="button"
                     onClick={() => {
                       let maxAmount = displayBalance;
                       if (action === "enter" && tokenIn === NATIVE_BNB) {
                         const val = parseFloat(displayBalance) - 0.005;
                         maxAmount = val > 0 ? val.toString() : "0";
                       }
                       fetchQuote(maxAmount);
                     }}
                     className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 active:scale-95 transition-all uppercase font-bold cursor-pointer"
                   >
                     max
                   </button>
                 )}
               </div>
            </div>
            <div className="relative mb-4">
              <input 
                type="number"
                value={amount}
                onChange={(e) => fetchQuote(e.target.value)}
                placeholder="0.0"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono text-lg"
              />
              <div className="absolute right-4 top-3.5 text-slate-500 font-medium">
                {inputSymbol}
              </div>
            </div>

            {loadingRoute && <div className="text-xs text-emerald-400 flex items-center gap-2 mb-4"><Loader2 className="w-3 h-3 animate-spin" /> Fetching best route...</div>}
            {errorMsg && <div className="text-xs text-red-400 mb-4 bg-red-400/10 p-2 rounded">{errorMsg}</div>}
            
            {route && !errorMsg && (
              <div className="mb-4 space-y-2 bg-slate-900 rounded-lg p-3 text-sm">
                {route.isManagedExit ? (
                   <div className="flex justify-between text-slate-400">
                     <span>Expected Output</span>
                     <span className="font-mono text-white">
                        Estimating (Real-time rate)
                     </span>
                   </div>
                ) : (
                   <div className="flex justify-between text-slate-400">
                     <span>{route.isManagedEnter ? `Inter. Output (${getUnderlyingSymbol()})` : 'Expected Output'}</span>
                     <span className="font-mono text-white whitespace-nowrap">
                       ~{formatUnits(BigInt(route.amountOut), route.isManagedEnter ? pool.underlyingDecimals! : (action === 'enter' ? pool.decimals : 18)).substring(0, 8)} {route.isManagedEnter ? getUnderlyingSymbol() : outputSymbol}
                     </span>
                   </div>
                )}
                
                <div className="flex justify-between text-slate-500 text-xs">
                  <span>Routing</span>
                  <span>
                    <ArrowDownUp className="w-3 h-3 inline mr-1" />
                    {pool.manager === 'venus' ? 'KyberSwap + Venus Protocol' : 'KyberSwap Aggregator'}
                  </span>
                </div>
              </div>
            )}

            {/* Yield Tracking / Fee Transparency Info */}
            {pool.apy && (
              <div className="mt-4 mb-4 p-3.5 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300">
                 <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 inline text-emerald-400" />
                    Yield and Fee Mechanics
                 </div>
                 <p className="text-slate-400 leading-relaxed">
                    {pool.manager === 'venus'
                      ? "Venus yields auto-compound directly into the token value (your vToken appreciates). Distributable XVS pool rewards can be monitored/claimed on the Venus Protocol app."
                      : "Auto-compounding: Earned protocol fees and yields are continuously reinvested on BSC. Your position balance appreciates automatically over time on-chain without visual friction."
                    }
                 </p>
              </div>
            )}

            {!isConnected ? (
              <button
                 type="button"
                 onClick={() => connect()}
                 className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all flex justify-center items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Connect Wallet to Deposit
              </button>
            ) : (
              <button
                 disabled={!route || executing || !!errorMsg}
                 onClick={executeAction}
                 className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold transition-all flex justify-center items-center gap-2"
              >
                {executing && <Loader2 className="w-4 h-4 animate-spin" />}
                {executing ? 'Executing...' : 'Confirm Transaction'}
              </button>
            )}
         </div>
      )})()}
    </div>
  );
}
