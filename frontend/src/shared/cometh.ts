import { ComethWallet, ConnectAdaptor, SupportedNetworks} from "@cometh/connect-sdk";
import { env } from "./environment";

export const walletAdaptor = new ConnectAdaptor({
  chainId: SupportedNetworks.MUMBAI, 
  apiKey:env.comethKey
});

export const comethWallet = new ComethWallet({
  authAdapter: walletAdaptor,
  apiKey:env.comethKey,
  rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/XjClZbydoofj8gXCHYvbOZpOSbn9f3_I",
});