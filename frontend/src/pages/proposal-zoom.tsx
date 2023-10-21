import { Button, Card, Divider, Textarea } from "@chakra-ui/react";
import { useState, FC, use, useEffect } from "react";
import { Progress } from "@chakra-ui/react";
import ConnectComethWallet from "@/components/Cometh/comethConnectWallet";
import SismoConnectFunction from "@/components/Sismo/SismoConnect";
import { useWalletAuth } from "@/components/Cometh/comethWalletAuth";
import ComethGaslessTransaction from "@/components/Cometh/comethGaslessFunction";
import {
  ComethApprove,
  ComethApproveFunction,
} from "@/components/Cometh/comethApprove";
import getAllNFts, { ApproveMetamask } from "@/components/ApproveProposal/approveMetamask";
import { useAccount } from "wagmi";

//Sismo Group ID

const ProposalZoom: FC = () => {
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
  
  const { address, isConnecting, isDisconnected } = useAccount()
  
  const [dateEnacted, setDateEnacted] = useState("20/10/2023");

  const [dayPeriod, setDayPeriod] = useState("3 Days");

  const [sismoVerfied, setsismoVerfied] = useState<string>("init");

  const [loggedInAddress, setLoggedInAddress] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInAddress(address || null);

  }, [address]);
  // console.log(loggedInAddress)

  useEffect(() => {
    console.log("login add", loggedInAddress);
  }, [loggedInAddress]);


  return (
    <div className="h-full">
      <div className="mt-8 w-2/3 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            {proposalTitle}
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <h1 className="text-xl font-semibold text-left justify-center mt-2">
            Description:
          </h1>
          <div className="w-full p-2 bg-transparent mt-2">
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
          </div>
          <h1 className="text-xl font-semibold text-left justify-center mt-4">
            Proposal Details:
          </h1>
          <div className="flex flex-row mt-2">
            <h1 className="text-md font-medium text-left justify-center">
              Date Enacted:
            </h1>
            <h1 className="text-md font-medium text-left justify-center ml-4">
              {dateEnacted}
            </h1>
          </div>
          <div className="flex flex-row mt-2 mb-8">
            <h1 className="text-md font-medium text-left justify-center">
              Voting Period:
            </h1>
            <h1 className="text-md font-medium text-left justify-center ml-4">
              {dayPeriod}
            </h1>
          </div>
          <Progress value={77} colorScheme="green" />
          <h1 className="text-md text-right justify-center">
            Quorum: 100 Approvals
          </h1>
          <h1 className="text-md text-right justify-center">
            Current: 77 Approvals
          </h1>
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
            setLoggedInAddress={setLoggedInAddress}
            />

          {/* <ComethGaslessTransaction/> */}
          <Button
                bg="black"
                color="white"
                _hover={{ opacity: 0.7 }}
                className="w-1/2 mx-auto my-8 items-center text-center justify-center"
                // onClick={()=>NFTFetcher()
                //   ("0x547F61FC3B2AC2B21518d660dE20398776d7C755", "0xC9Fd509E7969DE8Dbc1b5BfBdFc1418d90C27a3b")}
                onClick={getAllNFts}
              >
                get nfts
            </Button>

              
          <SismoConnectFunction 
            comethGroupId="0xc505a8125fc571896eecdadb908e7706"
            setsismoVerfied={setsismoVerfied}
          />

          {/* {sismoVerfied == "verified" ? (
            isConnected == true ? (
              <Button
                bg="black"
                color="white"
                _hover={{ opacity: 0.7 }}
                className="w-1/2 mx-auto my-8 items-center text-center justify-center"
                onClick={() => ComethApproveFunction(1,2)} // proposal id and token id
              >
                Approve Proposal with Cometh
              </Button>
            ) : (
              // <Button
              //   bg="black"
              //   color="white"
              //   _hover={{ opacity: 0.7 }}
              //   className="w-1/2 mx-auto my-8 items-center text-center justify-center"
              // >
              //   Approve Proposal with MetaMask
              // </Button>
              <>
                <ApproveMetamask/>
              </>
            )
          ) : (
            <></>
          )} */}
          {/* enable cometh wallet when sismoVerfied state is "verified" */}
        </Card>
      </div>
    </div>
  );
};

export default ProposalZoom;
