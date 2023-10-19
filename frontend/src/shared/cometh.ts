import { ComethWallet, ConnectAdaptor, SupportedNetworks} from "@cometh/connect-sdk";
import { env } from "./environment";

export const walletAdaptor = new ConnectAdaptor({
  chainId: SupportedNetworks.POLYGON, 
  apiKey:env.comethKey
});

export const comethWallet = new ComethWallet({
  authAdapter: walletAdaptor,
  apiKey:env.comethKey,
  rpcUrl: "https://polygon-rpc.com",
});