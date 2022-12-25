import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { chain, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

// using only 2 chains with WAGMI; ETH and Matic(Polygon)
const chainArray = [chain.polygon, chain.mainnet];
export const { chains, provider } = configureChains(chainArray, [
  publicProvider(),
]);


export const connectors = [
  new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
];
