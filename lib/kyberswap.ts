export const KYBER_BASE_URL = 'https://aggregator-api.kyberswap.com/bsc/api/v1';

export async function getRoute(tokenIn: string, tokenOut: string, amountIn: string) {
  const isBnbIn = tokenIn.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  const chargeFeeBy = isBnbIn ? 'currency_in' : 'currency_out';

  const params = new URLSearchParams({
    tokenIn,
    tokenOut,
    amountIn,
    chargeFeeBy,
    feeAmount: '50',
    feeReceiver: '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7',
    isInBps: 'true',
    source: 'BSCYieldManager'
  });
  const url = `${KYBER_BASE_URL}/routes?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch KyberSwap route');
  }
  return res.json();
}

export async function buildRoute(routeSummary: any, sender: string, recipient: string, slippageTolerance = 50) {
  const url = `${KYBER_BASE_URL}/route/build`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      routeSummary,
      sender,
      recipient,
      slippageTolerance,
      source: 'BSCYieldManager'
    })
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to build transaction data');
  }
  return res.json();
}
