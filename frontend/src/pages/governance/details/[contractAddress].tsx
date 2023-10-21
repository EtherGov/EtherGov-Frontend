import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import Governance from "../../../../public/Governance.json";
import { useEffect, useState } from "react";
import { Button, Select } from "@chakra-ui/react";
import axios from "axios";

function GovernanceDetail() {
  const [governanceAddress, setGovernanceAddress] = useState<string>(""); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const [council, setCouncil] = useState<string[]>([""]);
  const [chainId, setChainId] = useState<number>(0); // [
  const [walletAddress, setWalletAddress] = useState<string>("");
  const router = useRouter();
  const { address } = useAccount();

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
  return (
    <div>
      <div>
        <h1 className="text-[30px]">Governance Detail</h1>
      </div>
      <div>
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
      <div>
        <h1>Deploy AA Wallet</h1>
        <div>
          <Select
            placeholder="Select option"
            onChange={(e) => {
              setChainId(parseInt(e.target.value));
            }}
          >
            <option value="80001">Mumbai</option>
            <option value="11155111">Sepolia</option>
            <option value="5">Goerli</option>
          </Select>
          <Button onClick={handleDeployAA}>Deploy</Button>
        </div>
      </div>
      <div>
        <h1>Create Proposal</h1>
        <Button
          onClick={() => router.push(`/proposal/add/${governanceAddress}`)}
        >
          Propose
        </Button>
      </div>
      <div>
        <h1>Active Proposals</h1>
      </div>
      <div>
        <h1>Passed Proposals</h1>
      </div>
      <div>
        <h1>Failed Proposals</h1>
      </div>
    </div>
  );
}

export default GovernanceDetail;
