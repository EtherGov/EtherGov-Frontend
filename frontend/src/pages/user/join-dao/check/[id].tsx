import { useState } from "react";
import { useAccount } from "wagmi";
import { checkAndSignAuthMessage } from "@lit-protocol/auth-browser";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { Button } from "@chakra-ui/react";
import { getWalletClient, signMessage } from "wagmi/actions";
import { hashMessage, recoverPublicKey } from "viem";
import axios from "axios";

export default function CheckLit() {
  const { address } = useAccount();
  const [contractAddress, setContractAddress] = useState<string>("");

  const getAuthSig = async () => {
    const authSig = await checkAndSignAuthMessage({
      chain: "ethereum",
    });
    console.log(authSig);
    return authSig;
  };

  const runLitAction = async () => {
    const authSig = await getAuthSig();

    const walletClient = await getWalletClient();

    const hash = hashMessage("test");

    const data = await walletClient?.signMessage({ message: { raw: hash } });

    if (!data) return;

    const publicKey = await recoverPublicKey({
      hash: hash,
      signature: data,
    });

    console.log(publicKey);

    const result = await axios.post(
      "http://localhost:3001/lit/run-lit-action",
      {
        address: address,
        contractAddress: "0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43",
        publicKey: publicKey,
        authSig: authSig,
      }
    );

    console.log(result);
  };

  return (
    <div>
      <div>Check Lit</div>
      <Button onClick={runLitAction}>Get Auth Sig</Button>
    </div>
  );
}
