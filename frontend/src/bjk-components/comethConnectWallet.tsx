import { ComethWallet } from "@cometh/connect-sdk";
// import { CheckIcon } from "@radix-ui/react-icons";
// import { Icons } from "./../lib/ui/components";
import { Box, Spinner } from "@chakra-ui/react";

interface ConnectWalletProps {
  connectionError: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  wallet: ComethWallet;
}

function ConnectComethWallet({
  connectionError,
  isConnecting,
  isConnected,
  connect,
  wallet,
}: ConnectWalletProps): JSX.Element {
  const getTextButton = () => {
    if (isConnected) {
      return (
        <>
          <Box width={20} height={20} />
          <a
            // href={`https://mumbai.polygonscan.com/address/${wallet.getAddress()}`}
            // target="_blank"
          >
            {"Wallet connected"}
          </a>
        </>
      );
    } else if (isConnecting) {
      return (
        <>
          <Spinner className="h-6 w-6 animate-spin" />
          {"Getting wallet..."}
        </>
      );
    } else {
      return "Approve";
    }
  };

  return (
    <>
      {!connectionError ? (
        <button
          disabled={isConnecting || isConnected || !!connectionError}
          className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100 disabled:bg-white"
          onClick={connect}
        >
          {getTextButton()}
        </button>
      ) : (
        <p className="flex items-center justify-center text-gray-900 bg-red-50">
          Connection denied
        </p>
      )}
    </>
  );
}

export default ConnectComethWallet;

// import {
//   ComethProvider,
//   ComethWallet,
//   ConnectAdaptor,
//   SupportedNetworks,
// } from "@cometh/connect-sdk";
// // import { useState } from "react";
// import { useWalletContext } from "./useWalletContext";
// import { ethers } from "ethers";
// // import countContractAbi from "../../contract/counterABI.json";

// "use client";
// // import { ComethProvider, ComethWallet } from "@cometh/connect-sdk";
// // import { ethers } from "ethers";
// import { createContext, Dispatch, SetStateAction, useState } from "react";

// export const WalletContext = createContext<{
//   wallet: ComethWallet | null;
//   setWallet: Dispatch<SetStateAction<ComethWallet | null>>;
//   provider: ComethProvider | null;
//   setProvider: Dispatch<SetStateAction<ComethProvider | null>>;
//   counterContract: ethers.Contract | null;
//   setCounterContract: Dispatch<SetStateAction<any | null>>;
// }>({
//   wallet: null,
//   setWallet: () => {},
//   provider: null,
//   setProvider: () => {},
//   counterContract: null,
//   setCounterContract: () => {},
// });

// export function WalletProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }): JSX.Element {
//   const [wallet, setWallet] = useState<ComethWallet | null>(null);
//   const [provider, setProvider] = useState<ComethProvider | null>(null);
//   const [counterContract, setCounterContract] =
//     useState<ethers.Contract | null>(null);

//   return (
//     <WalletContext.Provider
//       value={{
//         wallet,
//         setWallet,
//         provider,
//         setProvider,
//         counterContract,
//         setCounterContract,
//       }}
//     >
//       {children}
//     </WalletContext.Provider>
//   );
// }

// export function useWalletAuth() {
//   const {
//     setWallet,
//     setProvider,
//     wallet,
//     counterContract,
//     setCounterContract,
//   } = useWalletContext();
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);

//   const [connectionError, setConnectionError] = useState<string | null>(null);

//   const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY;
//   const COUNTER_CONTRACT_ADDRESS = "0x3633A1bE570fBD902D10aC6ADd65BB11FC914624";

//   function displayError(message: string) {
//     setConnectionError(message);
//   }

//   async function connect() {
//     if (!apiKey) throw new Error("no apiKey provided");
//     setIsConnecting(true);
//     try {
//       const walletAdaptor = new ConnectAdaptor({
//         chainId: SupportedNetworks.MUMBAI,
//         apiKey,
//       });

//       const instance = new ComethWallet({
//         authAdapter: walletAdaptor,
//         apiKey,
//       });

//       const localStorageAddress = window.localStorage.getItem("walletAddress");

//       if (localStorageAddress) {
//         await instance.connect(localStorageAddress);
//       } else {
//         await instance.connect();
//         const walletAddress = await instance.getAddress();
//         window.localStorage.setItem("walletAddress", walletAddress);
//       }

//       const instanceProvider = new ComethProvider(instance);

//     //   const contract = new ethers.Contract(
//     //     COUNTER_CONTRACT_ADDRESS,
//     //     countContractAbi,
//     //     instanceProvider.getSigner()
//     //   );

//       setCounterContract(contract);

//       setIsConnected(true);
//       setWallet(instance as any);
//       setProvider(instanceProvider as any);
//     } catch (e) {
//       displayError((e as Error).message);
//     } finally {
//       setIsConnecting(false);
//     }
//   }

//   async function disconnect() {
//     if (wallet) {
//       try {
//         await wallet!.logout();
//         setIsConnected(false);
//         setWallet(null);
//         setProvider(null);
//         setCounterContract(null);
//       } catch (e) {
//         displayError((e as Error).message);
//       }
//     }
//   }
//   return {
//     wallet,
//     counterContract,
//     connect,
//     disconnect,
//     isConnected,
//     isConnecting,
//     connectionError,
//     setConnectionError,
//   };
// }
// ////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
// import { wallet } from "@/shared/cometh";
// import { Button } from "@chakra-ui/react";
// async function walletConnect(){
//     const localStorageAddress = window.localStorage.getItem("walletAddress");
//     console.log(wallet)
//     if (localStorageAddress) {
//       console.log("wallet connect")
//       await wallet.connect(localStorageAddress);
//     } else {
//       console.log("create wallet")
//       await wallet.connect();
//       const walletAddress = await wallet.getAddress();
//       window.localStorage.setItem("walletAddress", walletAddress);
//     }
//   }
// async function walletDisconnect() {
//     const walletAddress = await wallet.getAddress();

//     // if (wallet) {
//       // try {
//         await wallet!.logout();
//         // setIsConnected(false);
//         // setWallet(null);
//         // setProvider(null);
//         // setPayoutContract(null);
//         window.localStorage.removeItem("walletAddress");

//     //   } catch (e) {
//     //     console.log((e as Error).message);
//     //   }
//     // }
//   }

// function ComethButton(){
//     return(
//         <>
//             <>Testing</>
//             <Button onClick={async()=>await walletConnect()}>Connect wallet</Button>
    
//             <>Disconnect:</>
//             <Button onClick={async ()=>await walletDisconnect()}>Disconnect wallet</Button>
//         </>
//     )

// }