import DropdownButtonProfile from "@/components/Button/DropdownButtonProposal";
import { Button, Card, Divider, Input, Textarea } from "@chakra-ui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
} from "wagmi";
import ModalSpark from "@/components/Modal/ModalSpark";
import ModalERC20 from "@/components/Modal/ModalERC20";
import ModalCustomPayload from "@/components/Modal/ModalCustomPayload";

function AddProposalTransaction() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payload, setPayload] = useState("");
  const [quorum, setQuorum] = useState("");

  const [selectedDestinationChain, setSelectedDestinationChain] =
    useState("Mumbai");
  const [selectedTxnPresets, setSelectedTxnPresets] =
    useState("Spark Protocol");
  const [selectedSismoDataGroup, setSelectedSismoDataGroup] = useState("-");
  const [selectedERC20Power, setSelectedERC20Power] = useState("-");

  const [isOpenSpark, setIsOpenSpark] = useState(false);
  const [isOpenERC20, setIsOpenERC20] = useState(false);
  const [isOpenCustomPayload, setIsOpenCustomPayload] = useState(false);

  const handleChainChange = (newDuration: any) => {
    setSelectedDestinationChain(newDuration);
  };

  const handleTxnChange = (newDuration: any) => {
    setSelectedTxnPresets(newDuration);
    if (newDuration === "Spark Protocol") {
      setIsOpenSpark(true);
    } else if (newDuration === "Send ERC20 / NFTs") {
      setIsOpenERC20(true);
    }
  };

  const handleSismoChange = (newDuration: any) => {
    setSelectedSismoDataGroup(newDuration);
  };

  const handleERC20Change = (newDuration: any) => {
    setSelectedERC20Power(newDuration);
  };

  const handlePlusButtonClick = () => {
    setIsOpenCustomPayload(true);
  };

  const handleTest = () => {}; //function kosong buat tes program biar jalan aja

  return (
    <div className="h-full">
      <div className="mt-8 w-2/3 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            New Proposal: DAO Transaction
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
                className="w-full text-sm font-medium text-right"
                width="full"
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
                width="full"
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
              <DropdownButtonProfile
                values={["Mumbai", "Mantle", "Scroll", "Sepolia"]}
                defaultValue={selectedDestinationChain}
                onDurationChange={handleChainChange}
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
                values={["Spark Protocol", "Send ERC20 / NFTs", "Uniswap"]}
                defaultValue={selectedTxnPresets}
                onDurationChange={handleTxnChange}
              />
            </div>
            <ModalSpark
              isOpenModal={isOpenSpark}
              onCloseModal={() => setIsOpenSpark(false)}
              OnClickGeneratePayloadMarket={handleTest} //Change to real function
              OnClickGeneratePayloadsDAI={handleTest} //Change to real function
            />
            <ModalERC20
              isOpenModal={isOpenERC20}
              onCloseModal={() => setIsOpenERC20(false)}
              OnClickGeneratePayload={handleTest} //Change to real function
            />
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Payload:
              </h1>
            </div>
            <div className="w-8/12 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="Payload..."
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
              />
            </div>
            <div className="w-1/12 p-2 bg-transparent">
              <Button onClick={handlePlusButtonClick}>+</Button>
            </div>
            <ModalCustomPayload
              isOpenModal={isOpenCustomPayload}
              onCloseModal={() => setIsOpenCustomPayload(false)}
              OnClickConfirm={handleTest} //Change to real function
            />
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
                width="full"
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
                  "Link3 Early Profile Owner",
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
                values={["-", "Yes", "No"]}
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

export default AddProposalTransaction;
