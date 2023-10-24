// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
import { env } from "@/shared/environment";
import { Network, Alchemy } from "alchemy-sdk";
import Governance from "../../../public/Governance.json"
import { Button } from "@chakra-ui/react";
import { useContractWrite } from "wagmi";


// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: env.alchemyKey, // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.

};

const alchemy = new Alchemy(settings);

export async function getAllNFts(walletAddress: any, nftAddress: any): Promise<number> {
    try {
        // console.log("nftAddress",nftAddress);

        const nftsForOwner = await alchemy.nft.getNftsForOwner(walletAddress);

        // console.log(nftsForOwner.ownedNfts);

        for (const item of nftsForOwner.ownedNfts) {
            // console.log("Found:", item);

            if (item.contract.address.toLowerCase() === nftAddress.toLowerCase()) {
                // console.log("Token ID:", item.tokenId);
                return parseInt(item.tokenId);
            }
        }
        
        return 0;

    } catch (error) {
        console.error("Wallet Address does not own any NFT of that collection");
        throw error; // or handle it accordingly based on your application's needs
    }
}

interface ApproveMetamaskProps {
    proposalId: string | number; // Adjust type as needed
    tokenId: string | number; // Adjust type as needed
    deployedContractAddress: string; // Assuming it's a string representation of an address
    nftContractAddress: string; // Assuming it's a string representation of an address

}

const ApproveMetamask: React.FC<ApproveMetamaskProps> = ({ proposalId, tokenId, deployedContractAddress }) => {
    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: `0x${deployedContractAddress.slice(2)}`,
        abi: Governance.abi,
        functionName: 'stakeAndVote',
    })
    function CallContract() {
        if(window.localStorage.getItem("comethConnected")){
            window.localStorage.removeItem('comethConnected');
        }
        write({args: [proposalId,tokenId],})
    }

    return (
        <Button
            bg="black"
            color="white"
            _hover={{ opacity: 0.7 }}
            className="w-1/2 mx-auto my-8 items-center text-center justify-center"
            onClick={() => CallContract()}
        >
            Approve Proposal with MetaMask
        </Button>
    )
}



import { useEffect, useState } from "react";
import {
  useContractRead,
//   useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import NFTTest from "../../../public/NFTTest.json";

const ApproveNftMetamask: React.FC<ApproveMetamaskProps> = ({ proposalId, tokenId, deployedContractAddress, nftContractAddress }) => {

// // export function ApproveNft() {
//   const [nftAddress, setNftAddress] = useState<string>(
//     "0x36114dee13F83ebcC22618DE0da3Df585C46507A"
//   );
//   const [governanceAddress, setGovernanceAddress] = useState<string>(
//     "0x9f8ff148c0337d89038411fd036f626cf12f581e"
//   );
//   const [tokenId, setTokenId] = useState<number>(3);
  const [governanceData, setGovernanceData] = useState<string[]>([""]);
    console.log("nftContractAddress",nftContractAddress);
    console.log("deployedContractAddress",deployedContractAddress);
  const {
    data,
    isLoading,
    isSuccess,
    writeAsync: approveNft,
  } = useContractWrite({
    address: nftContractAddress as `0x${string}`,
    abi: NFTTest.abi,
    functionName: "approve",
    onSuccess: () => {
      if (write) {
        write();
      }
    },
  });

//   const { data: data2 } = useContractRead({
//     address: deployedContractAddress as `0x${string}`,
//     abi: Governance.abi,
//     functionName: "getGovernanceAndNFTLockAddresses",
//   });

  const { config } = usePrepareContractWrite({
    address: deployedContractAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "stakeAndVote",
    args: [Number(proposalId), Number(tokenId)],
  });

  const {
    data: data3,
    isLoading: isLoading3,
    isSuccess: isSuccess3,
    write,
  } = useContractWrite(config);

//   useEffect(() => {
//     console.log(data2);
//     setGovernanceData(data2 as string[]);
//   }, [data2]);

  const handleClick = async () => {
    window.localStorage.setItem("comethConnected", "done");
    if (approveNft) {
      window.localStorage.setItem("comethConnected", "done");
      await approveNft({
        args: [deployedContractAddress, tokenId],
      });
    }
  };
  
  return (

    // <div>
    //   <h1>Approve NFT</h1>
    //   <div>
        // <Button onClick={handleClick}>Approve</Button>

    <Button
        bg="black"
        color="white"
        _hover={{ opacity: 0.7 }}
        className="w-1/2 mx-auto my-8 items-center text-center justify-center"
        onClick={() => handleClick()}
    >
        Approve Proposal with MetaMask
    </Button>
    //   </div>
    //   <div>{isSuccess3 ?? <p>{data3?.hash}</p>}</div>
    // </div>

  );
}

export default ApproveNftMetamask;

