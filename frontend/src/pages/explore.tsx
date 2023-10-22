import { env } from "@/shared/environment";
import { useAccount, useContractRead } from "wagmi";
import GovernanceFactory from "../../public/GovernanceFactory.json";
import { useEffect, useState } from "react";
import { CardGovernance } from "@/components/Card/CardGovernance";
import { useRouter } from "next/router";
import { GovernanceData } from "@/utils/type";
import { AiOutlineSearch } from "react-icons/ai";
import { getWalletClient } from "wagmi/actions";
import { envConfigMappings } from "@/utils/config";

function ExplorePage() {
  const [governances, setGovernances] = useState<{
    addresses: string[];
    names: string[];
  }>({
    addresses: [],
    names: [],
  }); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0);
  const [governanceAddress, setGovernanceAddress] = useState<string>(""); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const router = useRouter();
  const { address } = useAccount();
  const { data } = useContractRead({
    address: governanceAddress as `0x${string}`,
    abi: GovernanceFactory.abi,
    functionName: "getGovernances",
  });

  const RETRY_COUNT = 5;
  const RETRY_DELAY = 1000; // 1 second

  useEffect(() => {
    const getChain = async () => {
      setWalletAddress(address as string);

      let client;
      let retry = 0;
      while (retry < RETRY_COUNT && !client) {
        client = await getWalletClient();
        if (!client) {
          retry++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
      }

      console.log(client);

      if (!client) {
        console.error("Failed to fetch wallet client after multiple attempts");
        return;
      }

      const chainId = await client.getChainId();
      if (!chainId) {
        alert("Please connect wallet");
        return;
      }

      setChainId(chainId);
      const contractAddress = envConfigMappings[chainId];
      if (!contractAddress) {
        alert("Chain not supported");
        return;
      }
      setGovernanceAddress(contractAddress.factory_address);
    };
    getChain();
    console.log(data);
    const processedData = data as GovernanceData;
    if (processedData && processedData["0"] && processedData["1"]) {
      setGovernances({
        addresses: processedData["0"],
        names: processedData["1"],
      });
    }
  }, [data]);

  const handleRoute = (address: string) => {
    router.push(`/governance/details/${address}`);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-rose-200 to-teal-200">
      <div className="w-full flex items-center justify-center">
        <input
          type="search"
          placeholder="Browse DATs..."
          className="w-1/2 mx-0 p-4 rounded-lg items-center border-2 border-gray-400 bg-transparent relative"
          // onChange={(e) => handleSearch(e)}
        />
        <button
          className="bg-transparent rounded-full p-4"
          // onClick={handleSearchButtonClick}
        >
          <AiOutlineSearch className="text-3xl text-gray-400" />
        </button>
      </div>
      <div className="m-8 container w-2/3 mx-auto grid grid-cols-2 gap-8 justify-center items-center">
        {governances.addresses.length ? (
          governances.addresses.map((address, key) => {
            const name = governances.names[key];
            return (
              <div
                key={key}
                onClick={() => {
                  handleRoute(address);
                }}
              >
                <CardGovernance address={address} name={name} />
              </div>
            );
          })
        ) : (
          <p>No governance available.</p>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
