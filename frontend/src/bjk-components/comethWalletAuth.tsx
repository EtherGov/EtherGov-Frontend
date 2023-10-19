"use client";

import { ComethProvider,} from "@cometh/connect-sdk";
import { useState } from "react";
import { useWalletContext } from "./useWalletContext";
import { ethers } from "ethers";
// import payoutABI from "../../contract/payoutABI.json";

// import { walletAdaptor } from "@/shared/cometh";
import { comethWallet } from "@/shared/cometh";
import { env } from "@/shared/environment";

export function useWalletAuth() {
  const {
    setWallet,
    setProvider,
    wallet,
    PayoutContract,
    setPayoutContract,
  } = useWalletContext();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [connectionError, setConnectionError] = useState<string | null>(null);

  const apiKey = env.comethKey

  const PAYOUT_CONTRACT_ADDRESS = "0x3a4F982b855589C9cc9c8d31dc69cc785412f285";

  function displayError(message: string) {
    setConnectionError(message);
  }

  async function connect() {
    if (!apiKey) throw new Error("no apiKey provided");
    setIsConnecting(true);
    try {

        const localStorageAddress = window.localStorage.getItem("walletAddress");

        if (localStorageAddress) {
            await comethWallet.connect(localStorageAddress);
            
        } else {
            await comethWallet.connect();
            const walletAddress = await comethWallet.getAddress();
            window.localStorage.setItem("walletAddress", walletAddress);
            
        }

        const instanceProvider = new ComethProvider(comethWallet!);

        // const contract = new ethers.Contract(
        //     PAYOUT_CONTRACT_ADDRESS,
        //     payoutABI,
        //     instanceProvider.getSigner()
        // );

        // setPayoutContract(contract);
        setPayoutContract(null);
        setIsConnected(true);
        setWallet(comethWallet as any);
        setProvider(instanceProvider as any);

    } catch (e) {
      displayError((e as Error).message);
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnect() {
    if (wallet) {
      try {
        await wallet!.logout();
        setIsConnected(false);
        setWallet(null);
        setProvider(null);
        setPayoutContract(null);
      } catch (e) {
        displayError((e as Error).message);
      }
    }
  }
  return {
    wallet,
    PayoutContract,
    connect,
    disconnect,
    isConnected,
    isConnecting,
    connectionError,
    setConnectionError,
  };
}