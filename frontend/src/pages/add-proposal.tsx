import DropdownButtonProfile from "@/components/Button/DropdownButtonProposal";
import { Button, Card, Divider, Input, Textarea } from "@chakra-ui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
} from "wagmi";

function AddProposal() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destinationChain, setDestinationChain] = useState("");
  const [payload, setPayload] = useState("");
  const [quorum, setQuorum] = useState("");

  const [selectedTxnPresets, setSelectedTxnPresets] = useState("Spark Protocol");
  const [selectedSismoDataGroup, setSelectedSismoDataGroup] = useState("-");
  const [selectedERC20Power, setSelectedERC20Power] = useState("-");

  const handleTxnChange = (newDuration: any) => {
    setSelectedTxnPresets(newDuration);
  };

  const handleSismoChange = (newDuration: any) => {
    setSelectedSismoDataGroup(newDuration);
  };

  const handleERC20Change = (newDuration: any) => {
    setSelectedERC20Power(newDuration);
  };

  return (
    <div className="h-full">
      <div className="mt-8 w-2/3 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            New Proposal
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Title:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                htmlSize={70}
                width="auto"
                variant="outline"
                borderColor="gray"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Description:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Textarea
                className="text-sm font-medium text-right"
                rows={4}
                cols={70}
                variant="outline"
                borderColor="gray"
                placeholder="Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Destination Chain:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                htmlSize={70}
                width="auto"
                variant="outline"
                borderColor="gray"
                placeholder="Destination Chain..."
                value={destinationChain}
                onChange={(e) => setDestinationChain(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                TXN Presets:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <DropdownButtonProfile
                values={[
                  "Spark Protocol",
                  "Send ERC20 / NFTs",
                  "Uniswap"
                ]}
                defaultValue={selectedTxnPresets}
                onDurationChange={handleTxnChange}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Payload:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                htmlSize={70}
                width="auto"
                variant="outline"
                borderColor="gray"
                placeholder="Payload..."
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Minimum Quorum (Approvals):
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent mt-3">
              <Input
                className="text-sm font-medium text-right"
                htmlSize={70}
                width="auto"
                variant="outline"
                borderColor="gray"
                placeholder="Minimum Quorum..."
                value={quorum}
                onChange={(e) => setQuorum(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                [Optional] Sismo Data Groups:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent mt-3">
              <DropdownButtonProfile
                values={[
                  "-",
                  "Verified Human",
                  "Twitter Ethereum Influencers",
                  "Link3 Early Profile Owner"
                ]}
                defaultValue={selectedSismoDataGroup}
                onDurationChange={handleSismoChange}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                [Optional] ERC20 as Voting Power:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent mt-3">
              <DropdownButtonProfile
                values={[
                  "-",
                  "Yes",
                  "No"
                ]}
                defaultValue={selectedERC20Power}
                onDurationChange={handleERC20Change}
              />
            </div>
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex justify-center mt-10">
            <Button
              bg="black"
              color="white"
              className="w-1/2"
              _hover={{ opacity: 0.7 }}
              // onClick={}
            >
              Submit Proposal
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AddProposal;
