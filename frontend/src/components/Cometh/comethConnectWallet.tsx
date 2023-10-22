import { ComethWallet } from "@cometh/connect-sdk";
// import { CheckIcon } from "@radix-ui/react-icons";
// import { Icons } from "./../lib/ui/components";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

interface ConnectWalletProps {
  connectionError: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  wallet: ComethWallet | null;
  walletAddress: string | null;
  setLoggedInAddress: (address: string | null) => void;
}

const ConnectComethWallet: React.FC<ConnectWalletProps> = ({
  connectionError,
  isConnecting,
  isConnected,
  connect,
  wallet,
  walletAddress,
  setLoggedInAddress
}) => {

  // useEffect(() => {
  //   if(window.localStorage.getItem("comethConnected")=="true"){
  //     connect
  //   }
  // }, []);

  useEffect(() => {
    console.log("Wallet", wallet);
  }, [wallet]);

  const getTextButton = () => {
    console.log("cometh wallet", wallet);
    // console.log("cometh walletAddress", walletAddress)
    if (isConnected) {
      setLoggedInAddress(walletAddress)
      window.localStorage.setItem("comethConnected", "true");
      return (
        // setComethLoggedIn(true),
        <>
          <h1 className="border-2 p-5 rounded-xl">
            <span className=" text-[#1F4172]">COMETH </span>Wallet Connected:
            <br />
            <a 
            href={`https://mumbai.polygonscan.com/address/${walletAddress}`}
            className="text-[#1F4172]"
            >
           {walletAddress}

            </a>
          </h1>
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
      return "Connect Cometh Wallet";
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
