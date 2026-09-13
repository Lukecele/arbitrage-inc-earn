const fetch = require('node-fetch');
async function run() {
  const vaults = await fetch('https://api.beefy.finance/vaults').then(r=>r.json());
  const apys = await fetch('https://api.beefy.finance/apy').then(r=>r.json());
  const bscVaults = vaults.filter(v => v.chain === 'bsc' && v.assets.length === 1 && v.status === 'active' && !v.name.toLowerCase().includes('lp'));
  
  const enriched = bscVaults.map(v => ({
    id: v.id,
    name: v.name,
    token: v.tokenAddress, // The token you deposit
    earn: v.earnedTokenAddress, // The mooToken contract
    apy: apys[v.id] || 0
  })).sort((a,b) => b.apy - a.apy).slice(0, 5);
  console.log(enriched);
}
run();
