import { useEffect } from "react";
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { FaPlus, FaSearch } from 'react-icons/fa';
import Image from "next/image";
import logo from "../../../public/EtherGov_Logo.png";
import { useAccount } from "wagmi";
import { useToast } from "@chakra-ui/react";



const HeroLayout = () => {

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
    router.push("/init-dat");
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
    <div className="h-screen flex flex-col items-center bg-white">
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
          Create, Manage, and Govern Decentralized Autonomous Organizations (DAOs)
          Accounts
        </Text>
      </div>
      <div className="space-y-4">
        <button
          className="w-full py-4 px-32 border-4 border-slate-200 bg-black text-xl text-white font-semibold rounded-lg shadow-md hover:opacity-70 flex items-center justify-center"
          onClick={handleCreateRoute}
        >
          <FaPlus className="mr-4" />
          <span>Create New DAOs</span>
        </button>
        <button
          className="w-full py-4 px-32 border-4 border-slate-200 bg-black text-xl text-white font-semibold rounded-lg shadow-md hover:opacity-70 flex items-center justify-center"
          onClick={handleBrowseRoute}
        >
          <FaSearch className="mr-4" />
          <span>Browse DAos</span>
        </button>
      </div>

    </div>
  );
};

export default HeroLayout;
