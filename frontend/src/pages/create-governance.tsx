import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  Input,
  Select,
} from "@chakra-ui/react";
import { env } from "@/shared/environment";
import GovernanceFactory from "../../public/GovernanceFactory.json";
import { getWalletClient, watchContractEvent } from "wagmi/actions";
import { envConfigMappings } from "@/utils/config";
import { watch } from "fs";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

//test multisig
//0x07E9FA5Dce2916e526f7c22fd1f4E630a186602D

export default function Home() {
  const [minimumVotes, setMinimumVotes] = useState<number>(0);
  const [mailboxAddress, setMailboxAddress] = useState<string>("");
  const [gasPayMaster, setGasPayMaster] = useState<string>("");
  const [factoryAddress, setFactoryAddress] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0);
  const [erc20, setErc20] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [governanceAddress, setGovernanceAddress] = useState<string>("");
  const [gasTank, setGasTank] = useState<string>("");
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: factoryAddress as `0x${string}`,
    abi: GovernanceFactory.abi,
    functionName: "createGovernance",
    args: [minimumVotes, mailboxAddress, gasPayMaster, erc20],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const unwatch = useContractEvent({
    address: factoryAddress as `0x${string}`,
    abi: GovernanceFactory.abi,
    eventName: "GovernanceCreated",
    listener: async (event) => {
      const governance = event[0].args.governance;
      setGovernanceAddress(governance);
      const result = await axios.post(
        "http://localhost:3001/governance/add-governance",
        {
          governanceAddress: governance,
          chainId: chainId,
          deployer: walletAddress,
        }
      );

      console.log(result.data);
      setGasTank(result.data.data[0].account_tank_address);
      unwatch?.();
    },
  });

  const handleDeploy = () => {
    if (write) {
      write();
    }
  };

  const RETRY_COUNT = 5;
  const RETRY_DELAY = 1000; // 1 second

  useEffect(() => {
    const getChain = async () => {
      setWalletAddress(address as string);

      let client;
      let retry = 0;
      while (retry < RETRY_COUNT && !client) {
        client = await getWalletClient();
        if (!client) {
          retry++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
      }

      console.log(client);

      if (!client) {
        console.error("Failed to fetch wallet client after multiple attempts");
        return;
      }

      const chainId = await client.getChainId();
      if (!chainId) {
        alert("Please connect wallet");
        return;
      }

      setChainId(chainId);
      const contractAddress = envConfigMappings[chainId];
      if (!contractAddress) {
        alert("Chain not supported");
        return;
      }
      setMailboxAddress(contractAddress.mailbox_address);
      setGasPayMaster(contractAddress.pay_master_address);
      setFactoryAddress(contractAddress.factory_address);
    };

    getChain();
  }, []);

  // useEffect(() => {
  //   const getChain = async () => {
  //     setWalletAddress(address as string);
  //     const client = await getWalletClient();
  //     console.log(client);
  //     if (!client) return;
  //     const chainId = await client.getChainId();
  //     if (!chainId) {
  //       alert("Please connect wallet");
  //       return;
  //     }
  //     setChainId(chainId);
  //     const contractAddress = envConfigMappings[chainId];
  //     if (!contractAddress) {
  //       alert("Chain not supported");
  //       return;
  //     }
  //     setMailboxAddress(contractAddress.mailbox_address);
  //     setGasPayMaster(contractAddress.pay_master_address);
  //     setFactoryAddress(contractAddress.factory_address);
  //   };
  //   getChain();
  // }, []);

  return (
    <div className="h-[2000px] bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="flex flex-col px-[100px]">
        <div>Create Governance</div>
        <div>
          <ConnectButton />
        </div>
        <div className="my-[10px]">
          <Button onClick={handleDeploy}>Deploy Governance</Button>
        </div>
        <div>
          <h2>IERC20 Token Address</h2>
          <Input
            onChange={(e) => {
              setErc20(e.target.value);
            }}
          />
        </div>
        <div>
          <h2>Minimum Vote</h2>
          <Input
            type="number"
            onChange={(e) => {
              setMinimumVotes(Number(e.target.value));
            }}
          />
        </div>

        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : isSuccess && !governanceAddress ? (
            <p>
              Waiting for Governance Address{" "}
              <span>
                <CircularProgress
                  isIndeterminate
                  color="green.300"
                  size="15px"
                />
              </span>
            </p>
          ) : governanceAddress ? (
            <p>{governanceAddress}</p>
          ) : (
            <p></p>
          )}
        </div>
        <div>
          {governanceAddress ? (
            <div>
              {gasTank ? (
                <p>{gasTank}</p>
              ) : (
                <p>
                  Waiting for Gas Tank Address{" "}
                  <span>
                    <CircularProgress
                      isIndeterminate
                      color="green.300"
                      size="15px"
                    />
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
