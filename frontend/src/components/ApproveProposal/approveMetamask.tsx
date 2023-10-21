// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
import { env } from "@/shared/environment";
import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: env.alchemyKey, // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.

};

const alchemy = new Alchemy(settings);

// Print all NFTs returned in the response:
export default async function getAllNFts() {
    // alchemy.nft.getNftsForOwner("0x547F61FC3B2AC2B21518d660dE20398776d7C755").catch();
    const nftsForOwner = await alchemy.nft.getNftsForOwner("0x547F61FC3B2AC2B21518d660dE20398776d7C755");

    console.log(nftsForOwner.ownedNfts)

    nftsForOwner.ownedNfts.forEach(item => {
        // console.log(item.contract.address);
        if (item.contract.address == "0xC9Fd509E7969DE8Dbc1b5BfBdFc1418d90C27a3b".toLowerCase()) {
            console.log("Found:", item);
        }
    });
}
