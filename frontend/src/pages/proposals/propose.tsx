import React, { useState } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abii from "../../../abii.json";

export default function Propose() {
  const [targetChain, setTargetChain] = useState<number>(0);
  const [targetAddress, setTargetAddress] = useState<string>("");
  const [tokenAddressSource, setTokenAddressSource] = useState<string>("");
  const [tokenAddressDestination, setTokenAddressDestination] = useState<string>("");
  const [sourceValue, setSourceValue] = useState<number>(0);
  const [destinationValue, setDestinationValue] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [voteNeeded, setVoteNeeded] = useState<number>(0);

  const { config } = usePrepareContractWrite({
    address: "0xB2090c114d665Edbf4b78146C86779422706D049",
    abi: abii,
    functionName: "createProposal",
    args: [
      {
        targetChain: targetChain,
        targetAddress: targetAddress,
        tokenAddressSource: tokenAddressSource,
        tokenAddressDestination: tokenAddressDestination,
        sourceValue: sourceValue,
        destinationValue: destinationValue,
        duration: duration,
        voteNeeded: voteNeeded,
        messageBody:
          "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184578616d706c652070726f706f73616c206d6573736167650000000000000000",
      },
    ],
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handlePropose = () => {
    if (write) {
      write();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Content area */}
      <div className=" p-10 ">
        <div className=" mb-5">
          <h1 className= " text-4xl">Propose</h1>
        </div>

        <div>
          <h1 className="text-xl font-bold"> Target Chain </h1>
          <input
            type="number"
            className="border border-dashed w-[300px]"
            onChange={(e) => setTargetChain(Number(e.target.value))}
          />

          <h1 className="text-xl font-bold mt-[30px]"> Target Address</h1>
          <input
            type="text"
            className="border border-dashed w-[300px]"
            onChange={(e) => setTargetAddress(e.target.value)}
          />

          <h1 className="text-xl font-bold mt-[30px]">Token Address Source</h1>
          <input
            type="text"
            className="border border-dashed w-[300px]"
            onChange={(e) => setTokenAddressSource(e.target.value)}
          />

          <h1 className="text-xl font-bold mt-[30px]">
            Token Address Destination
          </h1>
          <input
            type="text"
            className="border border-dashed w-[300px]"
            onChange={(e) => setTokenAddressDestination(e.target.value)}
          />

          <h1 className="text-xl font-bold mt-[30px]">Source Value</h1>
          <input
            type="text"
            className="border border-dashed w-[300px]"
            onChange={(e) => setSourceValue(Number(e.target.value))}
          />

          <h1 className="text-xl font-bold mt-[30px]">Destination Value</h1>
          <input
            type="text"
            className="border border-dashed w-[300px]"
            onChange={(e) => setDestinationValue(Number(e.target.value))}
          />

          <h1 className="text-xl font-bold mt-[30px]">Duration</h1>
          <input
            type="text"
            className="border border-dashed w-[300px]"
            onChange={(e) => setDuration(Number(e.target.value))}
          />

          <h1 className="text-xl font-bold mt-[30px]">Vote Needed</h1>
          <input
            type="text"
            className="border border-dashed w-[300px]"
            onChange={(e) => setVoteNeeded(Number(e.target.value))}
          />
        </div>

        <div className=" mt-10">
          <button onClick={handlePropose}> Write propose</button>
        </div>
      </div>
    </div>
  );
}
