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
    // PayoutContract,
    // setPayoutContract,
    // walletAddress,
  } = useWalletContext();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [connectionError, setConnectionError] = useState<string | null>(null);
  const[walletAddress, setWalletAddress] = useState<string | null>(null);
  const apiKey = env.comethKey

  // const PAYOUT_CONTRACT_ADDRESS = "0x3a4F982b855589C9cc9c8d31dc69cc785412f285";

  function displayError(message: string) {
    setConnectionError(message);
  }

  async function connect() {
    if (!apiKey) {
        displayError("No apiKey provided");
        return;
    }
    
    setIsConnecting(true);

    try {
        const localStorageAddress = window.localStorage.getItem("walletAddress");
        if (localStorageAddress) {
            await comethWallet.connect(localStorageAddress);
        } else {
            await comethWallet.connect();
            const address = comethWallet.getAddress();
            window.localStorage.setItem("walletAddress", address);
        }

        const currentWalletAddress = comethWallet.getAddress();
        setWalletAddress(currentWalletAddress);
        
        setWallet(comethWallet);
        const instanceProvider = new ComethProvider(comethWallet);
        setProvider(instanceProvider);

        setIsConnected(true);
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
        // setPayoutContract(null);
      } catch (e) {
        displayError((e as Error).message);
      }
    }
  }
  return {
    wallet,
    // PayoutContract,
    walletAddress,
    connect,
    disconnect,
    isConnected,
    isConnecting,
    connectionError,
    setConnectionError,
  };
}