import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import Governance from "../../../../public/Governance.json";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Select,
  CardHeader,
  Text,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function GovernanceDetail() {
  const [governanceAddress, setGovernanceAddress] = useState<string>(""); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const [council, setCouncil] = useState<string[]>([""]);
  const [chainId, setChainId] = useState<number>(0); // [
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const [activeProposals, setActiveProposals] = useState<any[]>([]);
  const [passedProposals, setPassedProposals] = useState<any[]>([]);
  const [failedProposals, setFailedProposals] = useState<any[]>([]);
  const router = useRouter();
  const { address } = useAccount();

  const { data } = useContractRead({
    address: governanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "returnAllCouncil",
  });

  const { data: data2 } = useContractRead({
    address: governanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "returnAllProposal",
  });

  useEffect(() => {
    const { contractAddress } = router.query;
    setGovernanceAddress(contractAddress as string);
    setWalletAddress(address as `0x${string}`);
  }, []);

  useEffect(() => {
    if (data && data2) {
      console.log(data2);
      setCouncil(data as string[]);
      const allProposals = data2 as any[];
      const now = Date.now();

      const active = allProposals.filter((p) => Number(p.endDate));

      setActiveProposals(
        allProposals.filter(
          (p) => !p.executed && !p.ended && Number(p.endDate) * 1000 > now
        )
      );

      setPassedProposals(allProposals.filter((p) => p.executed));

      setFailedProposals(
        allProposals.filter(
          (p) => !p.executed && Number(p.endDate) * 1000 < now
        )
      );

      setShouldRefetch(false);
    } else {
      setTimeout(() => setShouldRefetch(true), 5000);
    }
  }, [data, data2, shouldRefetch]);

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

  const handleNavigate = (id: any) => {
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

      <div>
        <div className=" py-14 px-32">
          <h1 className="text-3xl m-4">Proposals</h1>
          <Tabs>
            <TabList>
              <Tab>Active</Tab>
              <Tab>Pass</Tab>
              <Tab>Failed</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <h1>Active Proposals</h1>
                <div>
                  {activeProposals ? (
                    activeProposals.map((item, key) => {
                      return (
                        <Card key={key}>
                          <CardHeader>
                            <Heading>{item.description}</Heading>
                          </CardHeader>
                          <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Proposer
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {item.proposedAddress}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Proposed Transaction
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  Chain Id: {item.targetChain}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  Vault Address: {item.targetAddress}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  ERC20: {item.tokenAddressSource}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  Value: {Number(item.sourceValue)}
                                </Text>
                              </Box>
                              <div className="flex items-center justify-center">
                                <button
                                  onClick={() => handleNavigate(item.id)}
                                  className="w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                  Vote
                                </button>
                              </div>
                            </Stack>
                          </CardBody>
                        </Card>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </TabPanel>

              <TabPanel>
                <h1>Passed Proposals</h1>
                <div>
                  {passedProposals ? (
                    passedProposals.map((item, key) => {
                      return (
                        <Card key={key}>
                          <CardHeader>
                            <Heading>{item.description}</Heading>
                          </CardHeader>
                          <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Proposer
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {item.proposedAddress}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Proposed Transaction
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  Chain Id: {item.targetChain}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  Vault Address: {item.targetAddress}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  ERC20: {item.tokenAddressSource}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  Value: {Number(item.sourceValue)}
                                </Text>
                              </Box>
                            </Stack>
                          </CardBody>
                        </Card>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </TabPanel>

              <TabPanel>
                <h1>Failed Proposals</h1>
                <div>
                  {failedProposals ? (
                    failedProposals.map((item, key) => {
                      return (
                        <Card key={key}>
                          <CardHeader>
                            <Heading>{item.description}</Heading>
                          </CardHeader>
                          <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Proposer
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {item.proposedAddress}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size="xs" textTransform="uppercase">
                                  Proposed Transaction
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  Chain Id: {item.targetChain}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  Vault Address: {item.targetAddress}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  ERC20: {item.tokenAddressSource}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  Value: {Number(item.sourceValue)}
                                </Text>
                                <Text pt="2" fontSize="sm">
                                  Value:{" "}
                                  {new Date(
                                    Number(item.endDate) * 1000
                                  ).toDateString()}{" "}
                                  {new Date(
                                    Number(item.endDate) * 1000
                                  ).toLocaleTimeString()}
                                </Text>
                              </Box>
                            </Stack>
                          </CardBody>
                        </Card>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default GovernanceDetail;
