import "../../styles/globals.css";
import { createClient, WagmiConfig } from "wagmi";
import { connectors, provider } from "../config/wagmi";

export default function App({ Component, pageProps }) {
  const client = createClient({
    autoConnect: true,
    connectors: connectors,
    provider,
  });
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
