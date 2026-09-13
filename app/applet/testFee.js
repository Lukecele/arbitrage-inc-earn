const fetch = require("node-fetch");

async function run() {
  // USDT to USDC
  const tokenIn = "0x55d398326f99059ff775485246999027b3197955";
  const tokenOut = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
  const amountIn = "1000000000000000000"; // 1 USDT
  
  const params = new URLSearchParams({
    tokenIn,
    tokenOut,
    amountIn,
    chargeFeeBy: 'currency_in',
    feeAmount: '50',
    feeReceiver: '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7',
    isInBps: 'true',
    source: 'BSCYieldManager'
  });

  const url = `https://aggregator-api.kyberswap.com/bsc/api/v1/routes?${params.toString()}`;
  console.log("Fetching route...", url);
  const routeRes = await fetch(url).then(r => r.json());
  if (routeRes.code !== 0) {
     console.error("Route Error:", routeRes);
     return;
  }
  
  const routeSummary = routeRes.data.routeSummary;
  console.log("Route Extra Fee:", routeSummary.extraFee);
  
  const buildUrl = `https://aggregator-api.kyberswap.com/bsc/api/v1/route/build`;
  console.log("Building route...");
  
  // Note: I will test with and without fees in the body just to see the difference.
  const buildBody = {
    routeSummary,
    sender: "0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7",
    recipient: "0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7",
    slippageTolerance: 50,
    feeReceiver: '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7',
    chargeFeeBy: 'currency_in',
    isInBps: true,
    feeAmount: 50,
    source: 'BSCYieldManager'
  };

  const buildRes = await fetch(buildUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildBody)
  }).then(r => r.json());
  
  if (buildRes.code !== 0) {
      console.log("Build Error:", buildRes);
  } else {
      console.log("Build Success, Router Address:", buildRes.data.routerAddress);
  }
}
run();
