import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import Governance from "../../../../public/Governance.json";
import { useEffect, useState } from "react";
import { Button, Select } from "@chakra-ui/react";
import axios from "axios";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";


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

function GovernanceDetail() {
  const [governanceAddress, setGovernanceAddress] = useState<string>(""); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const [council, setCouncil] = useState<string[]>([""]);
  const [chainId, setChainId] = useState<number>(0); // [
  const [walletAddress, setWalletAddress] = useState<string>("");
  const router = useRouter();
  const { address } = useAccount();
  const [allProposals, setAllProposals] = useState<Proposal[]>([]);


  const { data } = useContractRead({
    address: governanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "returnAllCouncil",
  });

  useEffect(() => {
    const { contractAddress } = router.query;
    setGovernanceAddress(contractAddress as string);
    setWalletAddress(address as `0x${string}`);
  }, []);

  useEffect(() => {
    if (data) {
      setCouncil(data as string[]);
    }
  }, [data]);

  const handleDeployAA = async () => {
    try {
      const payload = {
        governanceAddress: governanceAddress,
        chainId: chainId,
        deployer: walletAddress,
      };

      console.log(payload);

      const result = await axios.post(
        "http://localhost:3001/account/deploy",
        payload
      );

      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const isCouncilMember = () => {
    return council.includes(`${address}`);
  };

  const { data: data3 } = useContractRead({
    address: governanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "returnAllProposal",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data3) {
        setAllProposals(data3 as Proposal[]);
        console.log("all proposals", data3);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [data3]);

  const handleNavigate = (id :any) => {
    router.push(`/vote/${id}/${governanceAddress}`);
  };
  return (
    <div>
      <div className="flex justify-center">
        <div className="mt-10 p-10 w-[1000px] border-solid border-4">
          <h1 className="text-[30px]">Governance Detail</h1>
          <hr className="mb-6 border-t-4  border-gray-400 w-full" />
          <p>List of Councils</p>
          <ul>
            {council ? (
              council.map((item, key) => {
                return <li key={key}>{item}</li>;
              })
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>

      {isCouncilMember() ? (
        <div className="flex justify-center">
          <div className="mt-10 p-10 w-[1000px] border-solid border-4">
            <h1 className="text-[30px]">Council&apos;s Privileges</h1>
            <hr className="border-t-4 mb-6  border-gray-400 w-full" />

            <div>
              <h1 className="text-lg">Deploy AA Wallet</h1>
              <Select
                placeholder="Select option"
                onChange={(e) => {
                  setChainId(parseInt(e.target.value));
                }}
              >
                <option value="80001">Mumbai</option>
                <option value="11155111">Sepolia</option>
                <option value="5">Goerli</option>
                <option value="534351">Scroll Sepolia</option>
                <option value="5001">Mantle Testnet</option>
              </Select>
              <Button className="m-5" onClick={handleDeployAA}>
                Deploy
              </Button>
            </div>
            <br />

            <div>
              <h1 className=" text-lg">Create Proposal</h1>
              <Button
                className="mx-5 my-3"
                onClick={() =>
                  router.push(`/proposal/add/${governanceAddress}`)
                }
              >
                Propose
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className=" py-14 px-32">
        <h1 className="text-3xl m-4">Proposals</h1>

        <Tabs>
          <TabList>
            <Tab>ACTIVE</Tab>
            <Tab>PASS</Tab>
            <Tab>FAILED</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div>
                <h1 className="text-xl">Active Proposals</h1>
                <br />
                {allProposals.length !== 0 ? (
                  <div>
                    {allProposals
                      .filter(
                        (proposal) => !proposal.ended && !proposal.executed
                      ) // filter out the proposals based on your condition
                      .map((proposal, index) => (
                        <div key={index} className="proposal">
                          <h2>{`Proposal ${index + 1}`}</h2>
                          <p>
                            <strong>Description:</strong> {proposal.description}
                          </p>
                          <p>
                            <strong>Duration:</strong>{" "}
                            {proposal.duration.toString()}
                          </p>
                          <p>
                            <strong>Group ID:</strong> {proposal.groupId}
                          </p>
                          <p>
                            <strong>Proposed Address:</strong>{" "}
                            {proposal.proposedAddress}
                          </p>
                          <p>
                            <strong>ID:</strong>
                            {Number(proposal.id)}
                          </p>
                          <button onClick={() => handleNavigate(proposal.id)}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Button
                          </button>
                          <br />
                          <br />
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>Loading</p>
                )}
              </div>
            </TabPanel>

            <TabPanel>
              <div>
                <h1 className="text-xl">Pass Proposals</h1>
                <br />
                {allProposals.length !== 0 ? (
                  <div>
                    {allProposals
                      .filter((proposal) => proposal.ended && proposal.executed) // filter out the proposals based on your condition
                      .map((proposal, index) => (
                        <div key={index} className="proposal">
                          <h2>{`Proposal ${index + 1}`}</h2>
                          <p>
                            <strong>Description:</strong> {proposal.description}
                          </p>
                          {/* Render other proposal properties as needed */}
                          <p>
                            <strong>Duration:</strong>{" "}
                            {proposal.duration.toString()}
                          </p>
                          <p>
                            <strong>Group ID:</strong> {proposal.groupId}
                          </p>
                          <p>
                            <strong>Proposed Address:</strong>{" "}
                            {proposal.proposedAddress}
                          </p>
                          {/* Similarly, add other attributes of the proposal you want to display */}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>Loading</p>
                )}
              </div>
            </TabPanel>

            <TabPanel>
              <div>
                <h1 className="text-xl">Failed Proposals</h1>
                <br />
                {allProposals.length !== 0 ? (
                  <div>
                    {allProposals
                      .filter(
                        (proposal) => proposal.ended && !proposal.executed
                      ) // filter out the proposals based on your condition
                      .map((proposal, index) => (
                        <div key={index} className="proposal">
                          <h2>{`Proposal ${index + 1}`}</h2>
                          <p>
                            <strong>Description:</strong> {proposal.description}
                          </p>
                          {/* Render other proposal properties as needed */}
                          <p>
                            <strong>Duration:</strong>{" "}
                            {proposal.duration.toString()}
                          </p>
                          <p>
                            <strong>Group ID:</strong> {proposal.groupId}
                          </p>
                          <p>
                            <strong>Proposed Address:</strong>{" "}
                            {proposal.proposedAddress}
                          </p>
                          {/* Similarly, add other attributes of the proposal you want to display */}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>Loading</p>
                )}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default GovernanceDetail;
