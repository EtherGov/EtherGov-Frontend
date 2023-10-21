import { ComethProvider } from "@cometh/connect-sdk";
import { comethWallet } from '@/shared/cometh';
import { ethers } from 'ethers';
// import registryabi from "../../../registryabi.json";
import Governance from "../../../public/Governance.json"

        //     uint256 proposalId,
        //     uint256 tokenId
        
export async function ComethApproveFunction(proposalId: any, tokenId: any, deployedContractAddress: any) {
    const provider = new ComethProvider(comethWallet)

    console.log("provider", provider.getSigner())

    const nftContract = new ethers.Contract(
        "0x5c0Bb444AB6E56408B4d70C78d4d708244ADe9BA",//deployedContractAddress
        Governance.abi,//registry
        provider.getSigner()
    )
    console.log("call contract")
    try {
        console.log("step 1")
        // function stakeAndVote(
        //     uint256 proposalId,
        //     uint256 tokenId
        // )
        const tx = await nftContract.stakeAndVote(proposalId, tokenId);
        console.log("tx", tx)
        const txResponse = await tx.wait();
        console.log("txResponse", txResponse);

    } catch (error) {
        console.error("Transaction failed:", error);
    }
}

// export function ComethApprove() {
//     return(
//         <div>
//             <button onClick={ComethApproveFunction}>Register DNS</button>
//         </div>
//     )
// }