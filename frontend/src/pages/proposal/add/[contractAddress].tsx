import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
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
import DateTimePicker from "react-datetime-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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
    description: "",
    targetChain: 0,
    targetAddress: "",
    tokenAddressSource: "",
    sourceValue: 0,
    endDate: Math.floor(Date.now() / 1000),
    voteNeeded: 1,
    nftAddress: "",
    groupId: "",
    messageBody: "",
  }); // [
  const [dateTime, setDateTime] = useState("");
  const [timestamp, setTimestamp] = useState<number | null>(null);

  const router = useRouter();

  const [selectedSismoDataGroup, setSelectedSismoDataGroup] = useState("-");

  const { config, error } = usePrepareContractWrite({
    address: contract as `0x${string}`,
    abi: Governance.abi,
    functionName: "createProposal",
    args: [proposalInput],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const encodePayload = (tokenAddress: string, functionName: string) => {
    if (
      chainId ||
      tokenAddress ||
      tokenValue ||
      functionName ||
      transactionType ||
      selectedVault ||
      destinationAddress
    ) {
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
      try {
        const encoding = ethers.utils.defaultAbiCoder.encode(type, value);
        console.log(encoding);
        setPayload(encoding);
        return payload;
      } catch (e) {
        console.log(e);
      }
    }
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
      endDate: timestamp as number,
      voteNeeded: Number(quorum),
      nftAddress: nftAddress,
      groupId: selectedSismoDataGroup,
      messageBody: encoded as string,
    };

    console.log(proposalInput);
    setProposalInput(proposalInput);
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

    if (selectedDate) {
      // Convert the datetime-local input value to a Date object
      const date = new Date(selectedDate);
      const unixTimestamp = Math.floor(date.getTime() / 1000);
      setTimestamp(unixTimestamp);
    }

    setDateTime(selectedDate);
  };

  const handleClick = () => {
    console.log(config);
    if (write) {
      write();
    }
  };

  const handleChange = (date: Date | null) => {
    if (date) {
      console.log(date.getTime() / 1000);
      setTimestamp(Math.floor(date.getTime() / 1000)); // Convert to Unix timestamp in seconds
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/governance/details/${contract}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const filterTemplate = (templateName: string) => {
    if (templateName === "Spark Protocol") {
      return (
        <div className="w-full p-2">
          <h1 className=" text-2xl font-bold">Spark Protocol</h1>
          <br />

          <div className="flex justify-between my-5">
            <h2 className="w-[180px] text-lg text-left font-semibold mr-4 mt-1">
              Type of transaction
            </h2>
            <div className=" w-[690px]">
              <Select
                placeholder="Select transaction type"
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="TRANSFER">TRANSFER</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-between my-5">
            <h2 className="w-[150px] text-lg text-left font-semibold mr-4 mt-1">
              Vault Module Address
            </h2>

            <div className="w-[690px]">
              <Select
                placeholder="Select vault"
                onChange={(e) => setSelectedVault(e.target.value)}
              >
                {vault ? (
                  vault.map((item, key) => {
                    return (
                      <option key={key} value={item.module_address}>
                        {item.module_address} (Chain ID: {item.chain_id})
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </Select>
            </div>
          </div>

          <div className="flex justify-between my-5">
            <h2 className="w-[150px] text-lg text-left font-semibold mr-4 mt-1">
              Send to
            </h2>
            <div className="w-[690px]">
              <Input
                placeholder="Address"
                onChange={(e) => setDestinationAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between my-5 ">
            <h2 className="w-[150px] text-lg text-left font-semibold mr-4 mt-1">
              Value
            </h2>
            <div className="w-[690px]">
              <Input
                type="number"
                onChange={(e) => {
                  setTokenValue(Number(e.target.value));
                }}
              />
            </div>
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

          <div className="flex w-full border-2 my-1 rounded-xl">
            {template ? filterTemplate(template) : <></>}
          </div>

          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Payload:
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
              <Input
                type="datetime-local"
                value={dateTime}
                onChange={handleDateTimeChange}
              />
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
