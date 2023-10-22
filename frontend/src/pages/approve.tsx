import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import NFTTest from "../../public/NFTTest.json";
import Governance from "../../public/Governance.json";
import { Button } from "@chakra-ui/react";

function ApproveNft() {
  const [nftAddress, setNftAddress] = useState<string>(
    "0x36114dee13F83ebcC22618DE0da3Df585C46507A"
  );
  const [governanceAddress, setGovernanceAddress] = useState<string>(
    "0x9f8ff148c0337d89038411fd036f626cf12f581e"
  );
  const [tokenId, setTokenId] = useState<number>(3);
  const [governanceData, setGovernanceData] = useState<string[]>([""]);

  const {
    data,
    isLoading,
    isSuccess,
    writeAsync: approveNft,
  } = useContractWrite({
    address: nftAddress as `0x${string}`,
    abi: NFTTest.abi,
    functionName: "approve",
    onSuccess: () => {
      if (write) {
        write();
      }
    },
  });

  const { data: data2 } = useContractRead({
    address: governanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "getGovernanceAndNFTLockAddresses",
  });

  const { config } = usePrepareContractWrite({
    address: governanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "stakeAndVote",
    args: [0, tokenId],
  });

  const {
    data: data3,
    isLoading: isLoading3,
    isSuccess: isSuccess3,
    write,
  } = useContractWrite(config);

  useEffect(() => {
    console.log(data2);
    setGovernanceData(data2 as string[]);
  }, [data2]);

  const handleClick = async () => {
    if (approveNft) {
      await approveNft({
        args: [governanceAddress, tokenId],
      });
    }
  };
  return (
    <div>
      <h1>Approve NFT</h1>
      <div>
        <Button onClick={handleClick}>Approve</Button>
      </div>
      <div>{isSuccess3 ?? <p>{data3?.hash}</p>}</div>
    </div>
  );
}

export default ApproveNft;
