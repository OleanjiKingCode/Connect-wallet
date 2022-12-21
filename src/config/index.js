export const config = {
  alchemyChain: "mumbai",
  isTestnet: true,
  ensRPC: String(process.env.NEXT_PUBLIC_ENS_RPC),
  chainId: process.env.CHAIN_ID || 80001,
  chainName: String(process.env.CHAIN_NAME),
  payoutsContractAddress:
    process.env.PAYOUTS_CONTRACT_ADDRERSS ||
    "0xCca2C72a79e4F3307caa469F12085Be6Fca2E15f",
  payoutsGraphApi:
    process.env.PAYOUTS_GRAPH_API ||
    "https://api.thegraph.com/subgraphs/name/oleanjikingcode/payout",
  iqPolygonAddress: "0xB9638272aD6998708de56BBC0A290a1dE534a578",
  Scan: String(process.env.SCAN_LINK),
};
