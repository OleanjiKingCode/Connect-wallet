import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { chain, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { config } from "./index";

const chainArray =
  config.alchemyChain === "mumbai" ? [chain.polygonMumbai] : [chain.polygon];
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
