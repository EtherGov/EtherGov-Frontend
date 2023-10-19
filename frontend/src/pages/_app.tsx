import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import {
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
  sepolia,
  polygonMumbai,
} from "viem/chains";
import { configureChains, mainnet, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import { env } from "@/shared/environment";
import Navbar from "@/components/Navbar/Navbar";

const { chains, publicClient } = configureChains(
  [goerli, sepolia, polygonMumbai],
  [
    alchemyProvider({
      apiKey: env.alchemyKey,
    }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
