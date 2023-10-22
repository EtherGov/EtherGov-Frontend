import { Button, Card, Divider, Textarea } from "@chakra-ui/react";
import { useState, FC, useEffect } from "react";
import { Progress } from "@chakra-ui/react";
import ConnectComethWallet from "@/components/Cometh/comethConnectWallet";
import SismoConnectFunction from "@/components/Sismo/SismoConnect";
import { useWalletAuth } from "@/components/Cometh/comethWalletAuth";
import ComethGaslessTransaction from "@/components/Cometh/comethGaslessFunction";
import {
  ComethApprove,
  ComethApproveFunction,
} from "@/components/Cometh/comethApprove";
import { useContractRead } from "wagmi";
import { useRouter } from "next/router";
import Governance from "../../../../public/Governance.json";

interface Proposal {
  description: string;
  duration: bigint; 
  ended: boolean;
  executed: boolean;
  groupId: string;
  id: bigint; 
  messageBody: string;
  nftAddress: string;
  proposedAddress: string;
  sourceValue: bigint; 
  targetAddress: string;
  targetChain: number;
  tokenAddressSource: string;
  votes: bigint; 
  votesNeeded: bigint;
}

//Sismo Group ID

const ProposalZoom: FC = () => {
  const router = useRouter();

  const {
    isConnecting: isComethConnecting,
    isConnected,
    connect,
    connectionError,
    wallet,
    walletAddress,
  } = useWalletAuth();

  const [proposalTitle, setProposalTitle] = useState(
    "Deposit 100k DAI for sDAI (Scroll)"
  );
  const [proposalDesc, setProposalDesc] = useState(
    "BAYC's DAT is capitalized with an initial 100k DAI. In this case, depositing this 100k for sDAI in order to earn 5% yield is a risk-free action."
  );

  const [dateEnacted, setDateEnacted] = useState("20/10/2023");

  const [dayPeriod, setDayPeriod] = useState("3 Days");

  const [sismoVerfied, setsismoVerfied] = useState<string>("init");

  const [comethLoggedIn, setComethLoggedIn] = useState(false);

  const [newId, setNewId] = useState("");
  const [newGovernanceAddress, setNewGovernanceAddress] = useState("");
  const [selectedProposal, setSelectedProposal] = useState([]); //selectedProposal ini data yang di fetch


 

  useEffect(() => {
    const { id, governanceAddress } = router.query;
    setNewId(id as string);
    setNewGovernanceAddress(governanceAddress as `0x${string}`);
  }, []);

  const { data: data1 } = useContractRead({
    address: newGovernanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "returnAllProposal",
  });

  // function handleClick (){
  //   console.log("id", newId)
  //   console.log("governance", newGovernanceAddress)
  //   console.log("data1", data1)
  //   console.log("asdasd", selectedProposal)
  // }

  useEffect(() => {
    // 'data1' is unknown, so we'll assert it as any, then check if it behaves as an array.
    const proposals = data1 as any;

    // Now, you should ensure that this data is indeed an array before working with it as one.
    if (proposals && Array.isArray(proposals)) {
      const index = Number(newId); // make sure newId is a valid number

      // Access the proposal by its index only if it's within the array bounds
      if (index >= 0 && index < proposals.length) {
        setSelectedProposal(proposals[index]);
      }
    }
  }, [data1, newId]); //




  return (
    <div className="h-full">
      {/* <button onClick={handleClick}>click</button> */}
      <div className="mt-8 w-2/3 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            {selectedProposal.description}
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <h1 className="text-xl font-semibold text-left justify-center mt-2">
            Group ID: {selectedProposal.groupId}
          </h1>
          {/* <div className="w-full p-2 bg-transparent mt-2">
            <Textarea
              className="text-md font-medium text-left"
              rows={4}
              cols={70}
              variant="outline"
              borderColor="gray"
              placeholder="Description..."
              value={proposalDesc}
              readOnly
            />
          </div> */}
          <h1 className="text-xl font-semibold text-left justify-center mt-4">
            Proposal Details:
          </h1>
          <br />
          {/* <div className="flex flex-row mt-2">
            <h1 className="text-md font-medium text-left justify-center">
              Date Enacted:
            </h1>
            <h1 className="text-md font-medium text-left justify-center ml-4">
              {dateEnacted}
            </h1>
          </div> */}
          <div className="flex flex-row mt-2 mb-8">
            <h1 className="text-md font-medium text-left justify-center">
              Voting Period:
            </h1>
            <h1 className="text-md font-medium text-left justify-center ml-4">
              {Number(selectedProposal.duration)}
            </h1>
          </div>
          <div className="flex flex-row mt-2 mb-8">
            <h1 className="text-md font-medium text-left justify-center">
              Voted:
            </h1>
            <h1 className="text-md font-medium text-left justify-center ml-4">
              {Number(selectedProposal.votes)}
            </h1>
          </div>
          <div className="flex flex-row mt-2 mb-8">
            <h1 className="text-md font-medium text-left justify-center">
              Vote needed:
            </h1>
            <h1 className="text-md font-medium text-left justify-center ml-4">
              {Number(selectedProposal.votesNeeded)}
            </h1>
          </div>
          {/* <Progress value={77} colorScheme="green" />
          <h1 className="text-md text-right justify-center">
            Quorum: 100 Approvals
          </h1>
          <h1 className="text-md text-right justify-center">
            Current: 77 Approvals
          </h1> */}
          {/* <h1 className="text-xl font-semibold text-center justify-center mt-8">
            Weight: 100 $APE
          </h1> */}
          <br></br>

          <ConnectComethWallet
            isConnected={isConnected}
            isConnecting={isComethConnecting}
            connect={connect}
            connectionError={connectionError}
            wallet={wallet}
            walletAddress={walletAddress}
            // setComethLoggedIn={setComethLoggedIn}
          />

          <br />

          {/* <ComethApprove/> */}
          {/* <ComethGaslessTransaction/> */}

          <SismoConnectFunction setsismoVerfied={setsismoVerfied} />

          {sismoVerfied == "verified" ? (
            isConnected == true ? (
              <Button
                bg="black"
                color="white"
                _hover={{ opacity: 0.7 }}
                className="w-1/2 mx-auto my-8 items-center text-center justify-center"
                onClick={() => ComethApproveFunction()}
              >
                Approve Proposal with Cometh
              </Button>
            ) : (
              <Button
                bg="black"
                color="white"
                _hover={{ opacity: 0.7 }}
                className="w-1/2 mx-auto my-8 items-center text-center justify-center"
              >
                Approve Proposal with MetaMask
              </Button>
            )
          ) : (
            <></>
          )}
          {/* enable cometh wallet when sismoVerfied state is "verified" */}
        </Card>
      </div>
    </div>
  );
};

export default ProposalZoom;
