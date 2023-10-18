import { useEffect } from "react";
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import router from "next/router";
import Image from "next/image";
import logo from "../../../public/EtherGov_Logo.png";

const HeroLayout = () => {
  const handleCreateRoute = () => {
    router.push("/RegisterDomain");
  };
  const handleBrowseRoute = () => {
    router.push("/Marketplace");
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
          className="w-full py-4 px-6 border-4 border-slate-300 bg-transparent text-lg text-gray-500 font-semibold rounded-lg shadow-md hover:bg-teal-50 active:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          onClick={handleCreateRoute}
        >
          Create New DATs
        </button>
        <button
          className="w-full py-4 px-6 border-4 border-slate-300 bg-transparent text-lg text-gray-500 font-semibold rounded-lg shadow-md hover:bg-teal-50 active:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          onClick={handleBrowseRoute}
        >
          Browse DATs
        </button>
      </div>
    </div>
  );
};

export default HeroLayout;
