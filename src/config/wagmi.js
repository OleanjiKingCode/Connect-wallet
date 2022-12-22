import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { chain, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const chainArray = [chain.polygonMumbai];
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
