import { ComethProvider } from "@cometh/connect-sdk";
import { comethWallet } from '@/shared/cometh';
import { ethers } from 'ethers';
// import registryabi from "../../../registryabi.json";

export async function ComethApproveFunction() {
    const provider = new ComethProvider(comethWallet)

    console.log("provider", provider.getSigner())

    const nftContract = new ethers.Contract(
        "0x83E6A1A9f3A0bBF368Bb997A66010DDc79ffa779",//deployed address
        registryabi,//registry
        provider.getSigner()
    )
    console.log("call contract")
    try {
        console.log("step 1")
        const tx = await nftContract.updateOwner(1, "0x1A10A9331F011D44eF360A3D416Ea8763e95F2C8");
        console.log("tx", tx)
        const txResponse = await tx.wait();
        console.log("txResponse", txResponse);

    } catch (error) {
        console.error("Transaction failed:", error);
    }
}

export function ComethApprove() {
    return(
        <div>
            <button onClick={ComethApproveFunction}>Register DNS</button>
        </div>
    )
}