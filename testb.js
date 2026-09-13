const fetch = require('node-fetch');
async function run() {
  const url = 'https://aggregator-api.kyberswap.com/bsc/api/v1/routes?tokenIn=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&tokenOut=0x55d398326f99059fF775485246999027B3197955&amountIn=10000000000000000&chargeFeeBy=currency_in&feeAmount=50&feeReceiver=0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7&isInBps=true';
  const res = await fetch(url).then(r=>r.json());
  console.log(res.data.routeSummary);
}
run();
