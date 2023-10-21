import DropdownButtonProfile from "@/components/Button/DropdownButtonProposal";
import {
  Button,
  Card,
  Divider,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ModalCustomPayload from "@/components/Modal/ModalCustomPayload";
import { chainID, templateConfig } from "@/utils/config";
import axios from "axios";
import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import Governance from "../../../../public/Governance.json";
import { ProposalInput } from "@/utils/interface";

function AddProposalTransaction() {
  const [contract, setContract] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0); // [
  const [description, setDescription] = useState("");
  const [payload, setPayload] = useState("");
  const [quorum, setQuorum] = useState("");
  const [vault, setVault] = useState<any[]>([]);
  const [selectedVault, setSelectedVault] = useState<any>(""); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const [template, setTemplate] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("TRANSFER"); // ["TRANSFER", "DEPLOY_AA", "DEPLOY_MODULE"
  const [tokenValue, setTokenValue] = useState<number>(0); // [
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [duration, setDuration] = useState<number>(0); // [
  const [nftAddress, setNftAddress] = useState<string>("");
  const [proposalInput, setProposalInput] = useState<ProposalInput>({
    description: "test data",
    targetChain: 5001,
    targetAddress: "0x64A2C48D18C03AcC799863A5DA2992cb68D2B813",
    tokenAddressSource: "0x81cBB0aa06cB4ECeB64a1959e29509f109F58C29",
    sourceValue: 100,
    duration: 86400,
    voteNeeded: 15,
    nftAddress: "0x83df724178676b3508b0eab837c9d8847d8e0c7a",
    groupId: "0x9bfaf997efdde9a6372fe679f177a5c1",
    messageBody:
      "0x000000000000000000000000000000000000000000000000000000000000138900000000000000000000000081cbb0aa06cb4eceb64a1959e29509f109f58c29000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000064a2c48d18c03acc799863a5da2992cb68d2b813000000000000000000000000ca51855fba4aae768dcc273349995de391731e7000000000000000000000000000000000000000000000000000000000000000277472616e7366657246726f6d28616464726573732c20616464726573732c2075696e74323536290000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000085452414e53464552000000000000000000000000000000000000000000000000",
  }); // [
  const router = useRouter();

  const [selectedSismoDataGroup, setSelectedSismoDataGroup] = useState("-");

  const { config } = usePrepareContractWrite({
    address: contract as `0x${string}`,
    abi: Governance.abi,
    functionName: "createProposal",
    args: [proposalInput],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const encodePayload = (tokenAddress: string, functionName: string) => {
    const value = [
      chainId,
      tokenAddress, //token address
      tokenValue,
      functionName,
      transactionType,
      selectedVault, //mumbai
      destinationAddress, //address of the same network
    ];
    console.log(value);
    const type = [
      "uint256",
      "address",
      "uint256",
      "string",
      "string",
      "address",
      "address",
    ];
    const encoding = ethers.utils.defaultAbiCoder.encode(type, value);
    console.log(encoding);
    setPayload(encoding);
    return payload;
  };

  useEffect(() => {
    const getVault = async (contract: string) => {
      const result = await axios.get(
        `http://localhost:3001/governance/get-vault/${contract}`
      );

      console.log(result.data);
      setVault(result.data);
    };
    const contractAddress = router.query.contractAddress as string;
    setContract(contractAddress);
    getVault(contractAddress);
  }, [router.query.contractAddress]);

  const handleTest = () => {
    const templateData = templateConfig.find((item) => item.name === template);
    if (!templateData) return;
    const encoded = encodePayload(
      templateData.token_address,
      templateData.function_name
    );
    console.log(nftAddress);
    const proposalInput: ProposalInput = {
      description: description,
      targetChain: chainId,
      targetAddress: selectedVault,
      tokenAddressSource: templateData.token_address,
      sourceValue: tokenValue,
      duration: duration,
      voteNeeded: Number(quorum),
      nftAddress: nftAddress,
      groupId: selectedSismoDataGroup,
      messageBody: encoded,
    };

    console.log(proposalInput);
    setProposalInput(proposalInput);
  };

  const handleClick = () => {
    console.log(config);
    if (write) {
      write();
    }
  };

  const filterTemplate = (templateName: string) => {
    if (templateName === "Spark Protocol") {
      return (
        <div>
          <h1>Spark Protocol</h1>
          <div className="flex">
            <h2 className="text-lg text-left font-semibold mr-4 mt-1">
              Type of transaction
            </h2>
            <Select
              placeholder="Select transaction type"
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="TRANSFER">TRANSFER</option>
            </Select>
          </div>
          <div className="flex">
            <h2 className="text-lg text-left font-semibold mr-4 mt-1">
              Vault Address
            </h2>
            <Select
              placeholder="Select vault"
              onChange={(e) => setSelectedVault(e.target.value)}
            >
              {vault ? (
                vault.map((item, key) => {
                  return (
                    <option key={key} value={item.wallet_address}>
                      {item.wallet_address} (Chain ID: {item.chain_id})
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </Select>
          </div>
          <div className="flex">
            <h2 className="text-lg text-left font-semibold mr-4 mt-1">
              Send to
            </h2>
            <Input
              placeholder="Address"
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
          </div>
          <div className="flex">
            <h2 className="text-lg text-left font-semibold mr-4 mt-1">Value</h2>
            <Input
              type="number"
              onChange={(e) => {
                setTokenValue(Number(e.target.value));
              }}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full">
      <div className="mt-8 w-2/3 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            New Proposal: DAT Transaction
          </h1>
          <Divider colorScheme="gray" className="my-4" />
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
                Destination Chain ID:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Select onChange={(e) => setChainId(Number(e.target.value))}>
                {chainID ? (
                  chainID.map((chain, index) => {
                    return (
                      <option key={index} value={chain.chainId}>
                        {chain.network}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </Select>
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                TXN Presets:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent flex flex-col">
              <Select
                placeholder="Select Template"
                onChange={(e) => setTemplate(e.target.value)}
              >
                {templateConfig ? (
                  templateConfig.map((template, index) => {
                    return (
                      <option key={index} value={template.name}>
                        {template.name}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </Select>
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            {template ? filterTemplate(template) : <></>}
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Payload:
              </h1>
            </div>
            <div className="w-8/12 p-2 bg-transparent">
              <Textarea
                className="text-sm font-medium text-right"
                rows={4}
                width="full"
                variant="outline"
                borderColor="gray"
                placeholder="Description..."
                disabled={true}
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
                Duration:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent mt-3">
              <Select onChange={(e) => setDuration(Number(e.target.value))}>
                <option value="60">1 Minute</option>
                <option value="86400">1 Day</option>
                <option value="172800">2 Days</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                NFT Contract
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent mt-3">
              <Input onChange={(e) => setNftAddress(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                [Optional] Sismo Data Groups:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent mt-3">
              <Input
                onChange={(e) => setSelectedSismoDataGroup(e.target.value)}
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
              onClick={handleTest}
            >
              Review
            </Button>
          </div>
          <div className="flex justify-center mt-10">
            <Button
              bg="black"
              color="white"
              className="w-1/2"
              _hover={{ opacity: 0.7 }}
              onClick={handleClick}
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
