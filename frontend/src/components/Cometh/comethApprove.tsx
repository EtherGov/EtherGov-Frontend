import { ComethProvider } from "@cometh/connect-sdk";
import { comethWallet } from '@/shared/cometh';
import { ethers } from 'ethers';
import Governance from "../../../public/Governance.json"
import NFTTest from "../../../public/NFTTest.json";


        //     uint256 proposalId,
        //     uint256 tokenId
        
export async function ComethApproveFunction(proposalId: any, tokenId: any, deployedContractAddress: string, nftContractAddress: string) {
    const provider = new ComethProvider(comethWallet)

    console.log("provider", provider.getSigner())
    
/////
// Now, inside your component or function:
// const nftContract = new ethers.Contract(nftContractAddress, NFTTest.abi, provider.getSigner());
// nftContract.on("approve", (owner, approved, tokenId) => {});
/////

    const governanceContract = new ethers.Contract(
        deployedContractAddress,//deployedContractAddress
        Governance.abi,//registry
        provider.getSigner()
    )
    // console.log("call contract")
    try {
        window.localStorage.setItem("comethConnected", "done");

        const tx = await governanceContract.stakeAndVote(proposalId, tokenId);
        console.log("tx", tx)
        const txResponse = await tx.wait();
        console.log("txResponse", txResponse);
        window.localStorage.setItem("comethConnected", "done");

    } catch (error) {
        console.error("Transaction failed:", error);
    }
}