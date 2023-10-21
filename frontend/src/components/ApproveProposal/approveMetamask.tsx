//use wagmi to call approve function in a contract

//     uint256 proposalId,
//     uint256 stakeAmount,
//     uint256 tokenId
import { useState } from 'react';
import { ethers } from 'ethers';

async function FetchNFTs(walletAddress: string, nftContractAddress: string){
    const [tokenIds, setTokenIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // const fetchNFTs = async () => {
        const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemyapi.io/v2/YOUR_ALCHEMY_KEY");

        const erc721ABI = [
            "function balanceOf(address owner) view returns (uint256)",
            "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
        ];

        // const walletAddress = "YOUR_WALLET_ADDRESS";
        // const nftContractAddress = "YOUR_NFT_CONTRACT_ADDRESS";

        const contract = new ethers.Contract(nftContractAddress, erc721ABI, provider);
        
        try {
            const balance = await contract.balanceOf(walletAddress);
            const fetchedTokenIds: string[] = [];

            for (let i = 0; i < balance.toNumber(); i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(walletAddress, i);
                fetchedTokenIds.push(tokenId.toString());
            }

            setTokenIds(fetchedTokenIds);
        } catch (err: any) {
            setError(err.message);
        }        
    // };

    // return (
    //     <div>
    //         <button onClick={fetchNFTs}>Fetch My NFTs</button>
    //         {error && <p>Error: {error}</p>}
    //         {tokenIds.length > 0 && (
    //             <ul>
    //                 {tokenIds.map((tokenId, index) => (
    //                     <li key={index}>{tokenId}</li>
    //                 ))}
    //             </ul>
    //         )}
    //     </div>
    // );
};

export default function ApproveMetamask(
 proposalId, stakeAmount, tokenId
) {
    //Governance contract
    // function stakeAndVote(
    //     uint256 proposalId,
    //     uint256 stakeAmount,
    //     uint256 tokenId)
    
};
