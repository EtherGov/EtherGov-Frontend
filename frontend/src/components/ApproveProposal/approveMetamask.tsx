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
}

const ApproveMetamask: React.FC<ApproveMetamaskProps> = ({ proposalId, tokenId, deployedContractAddress }) => {
    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: `0x${deployedContractAddress.slice(2)}`,
        abi: Governance.abi,
        functionName: 'stakeAndVote',
    })



    function CallContract() {
        if(window.localStorage.getItem("comethConnected")){
            localStorage.removeItem('comethConnected');
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
export default ApproveMetamask;
