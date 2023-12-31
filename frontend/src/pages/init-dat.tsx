import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@chakra-ui/react";
import GovernanceFactory from "../../public/GovernanceFactory.json";
import { getWalletClient } from "wagmi/actions";
import { envConfigMappings } from "@/utils/config";
import axios from "axios";

export default function InitDat() {
  const [mailboxAddress, setMailboxAddress] = useState<string>("");
  const [gasPayMaster, setGasPayMaster] = useState<string>("");
  const [factoryAddress, setFactoryAddress] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0);
  const [erc20, setErc20] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [governanceAddress, setGovernanceAddress] = useState<string>("");
  const [gasTank, setGasTank] = useState<string>("");
  const [councilAddresses, setCouncilAddresses] = useState<string[]>([""]); // Start with one empty address

  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: factoryAddress as `0x${string}`,
    abi: GovernanceFactory.abi,
    functionName: "createGovernance",
    args: [name, mailboxAddress, gasPayMaster, councilAddresses],
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

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newAddresses = [...councilAddresses];
    newAddresses[index] = event.target.value;
    setCouncilAddresses(newAddresses);
  };

  const removeCouncil = (index: number): void => {
    const newAddresses = councilAddresses.filter((_, i) => i !== index);
    setCouncilAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    setCouncilAddresses([...councilAddresses, ""]);
  };

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

  return (
    <div className="flex justify-center bg-gradient-to-r from-rose-200 to-teal-200 min-h-screen">
      <div className="mt-[30px] w-[900px]">
        <div className="flex flex-col px-[100px] rounded-2xl border-2 bg-white">
          {/* INPUT */}
          <div>
            <h1 className=" mt-5 text-4xl font-extrabold">Initialize DAT</h1>
            <hr className="my-4 border-t-4  border-gray-400 w-full" />
            <br />

            <div className="flex items-center gap-4">
              <h2 className=" text-xl font-medium w-32">DAO Name</h2>
              <input
                className="w-[585px] py-2 px-4 border-2 border-black bg-transparent focus:outline-none focus:border-gray-400 rounded-xl"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <br />

            {/* <div>
              <h2 className=" text-xl font-medium">IERC20 Token Address</h2>
              <input
                className="w-[700px] py-2 px-4 border-2 border-black bg-transparent focus:outline-none focus:border-gray-400 rounded-xl"
                onChange={(e) => {
                  setErc20(e.target.value);
                }}
              />
            </div> */}

            <div>
              {councilAddresses.map((address, index) => (
                <div key={index}>
                  <br />
                  <h2 className=" text-xl font-medium">
                    {index + 1}. Council Address
                  </h2>
                  <div className="flex">
                    <input
                      className="w-[590px] py-2 px-4 border-2 border-black bg-transparent focus:outline-none focus:border-gray-400 rounded-xl"
                      type="text"
                      placeholder="Enter council address"
                      value={address}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    <Button
                      className=" ml-5"
                      onClick={() => removeCouncil(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className=" my-[30px]">
                <Button onClick={handleAddAddress}>Add Council Address</Button>
              </div>
            </div>
            <div className="my-[10px]">
              <Button onClick={handleDeploy}>Deploy Governance</Button>
            </div>
          </div>


          {/* RENDER GOVERNANCE ADDRESS */}
          <div>
            {isLoading ? (
              <p className="border-2 m-5 p-3 text-center rounded-2xl bg-teal-500">Loading...</p>
            ) : isSuccess && !governanceAddress ? (
              <p className="border-2 m-5 p-3 text-center rounded-2xl bg-amber-300">
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
              <p className="border-2 m-5 p-3 text-center rounded-2xl bg-lime-400">Governance Address: {governanceAddress}</p>
            ) : (
              <p></p>
            )}
          </div>

          {/*RENDER GAS TANK ADDRESS */}
          <div>
            {governanceAddress ? (
              <div>
                {gasTank ? (
                  <p className="border-2 m-5 p-3 text-center rounded-2xl bg-lime-400">Gas Tank Address{gasTank}</p>
                ) : (
                  <p className="border-2 m-5 p-3 text-center rounded-2xl bg-amber-300">
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
    </div>
  );
}

// {
//   "description": "Delkin Homo",
//   "targetChain": 5001,
//   "targetAddress": "0xf3019aD885Ad9fd38441d911e33D9c2139F63525",
//   "tokenAddressSource": "0x81cBB0aa06cB4ECeB64a1959e29509f109F58C29",
//   "sourceValue": 100,
//   "duration": 1697916420,
//   "voteNeeded": 1,
//   "nftAddress": "0x83df724178676b3508b0eab837c9d8847d8e0c7a",
//   "groupId": "0x9bfaf997efdde9a6372fe679f177a5c1",
//   "messageBody": "0x000000000000000000000000000000000000000000000000000000000000138900000000000000000000000081cbb0aa06cb4eceb64a1959e29509f109f58c29000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000f3019ad885ad9fd38441d911e33d9c2139f63525000000000000000000000000ca51855fba4aae768dcc273349995de391731e7000000000000000000000000000000000000000000000000000000000000000277472616e7366657246726f6d28616464726573732c20616464726573732c2075696e74323536290000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000085452414e53464552000000000000000000000000000000000000000000000000"
// }
