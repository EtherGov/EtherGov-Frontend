import { useEffect } from "react";
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { FaPlus, FaSearch } from 'react-icons/fa';
import Image from "next/image";
import logo from "../../../public/EtherGov_Logo.png";
import { useAccount } from "wagmi";
import { useToast } from "@chakra-ui/react";
import ConnectComethWallet from "@/bjk-components/comethConnectWallet";
import { useWalletAuth } from "@/bjk-components/comethWalletAuth";


const HeroLayout = () => {
  const { isConnecting:isComethConnecting, isConnected, connect, connectionError, wallet } = useWalletAuth();

  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();

  const toast = useToast();

  const handleCreateRoute = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }
    router.push("/");
  };
  const handleBrowseRoute = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }
    router.push("/explore");
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-r from-rose-200 to-teal-200">
      <Image
        className="mx-auto pt-16"
        src={logo}
        alt="EtherGov Logo"
        width={200}
        height={200}
      />
      <div className="text-center mb-8">
        <Text fontSize="7xl" className="font-extrabold text-gray-900">
          EtherGov
        </Text>
        <Text fontSize="2xl" className="font-semibold text-gray-500">
          Create, Manage, and Govern Decentralized Autonomous Treasury (DAT)
          Accounts
        </Text>
      </div>
      <div className="space-y-4">
        <button
          className="w-full py-4 px-32 border-4 border-slate-300 bg-transparent text-xl text-gray-500 font-semibold rounded-lg shadow-md hover:bg-teal-50 flex items-center justify-center"
          onClick={handleCreateRoute}
        >
          <FaPlus className="mr-4" />
          <span>Create New DATs</span>
        </button>
        <button
          className="w-full py-4 px-32 border-4 border-slate-300 bg-transparent text-xl text-gray-500 font-semibold rounded-lg shadow-md hover:bg-teal-50 flex items-center justify-center"
          onClick={handleBrowseRoute}
        >
          <FaSearch className="mr-4" />
          <span>Browse DATs</span>
        </button>
      </div>

      <ConnectComethWallet 
        isConnected={isConnected}
        isConnecting={isComethConnecting}
        connect={connect}
        connectionError={connectionError}
        wallet={wallet!}
      />
    </div>
  );
};

export default HeroLayout;
