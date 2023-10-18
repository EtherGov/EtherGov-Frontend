import { env } from "@/shared/environment";
import { useContractRead } from "wagmi";
import GovernanceFactory from "../../public/GovernanceFactory.json";
import { useEffect, useState } from "react";
import { CardGovernance } from "@/components/Card/CardGovernance";
import { useRouter } from "next/router";
import { GovernanceData } from "@/utils/type";

function ExplorePage() {
  const [governances, setGovernances] = useState<{
    addresses: string[];
    names: string[];
  }>({
    addresses: [],
    names: [],
  }); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const router = useRouter();
  const { data } = useContractRead({
    address: "0x4b4526247b7890ef5f8844de4dd9bf42fa420f4a",
    abi: GovernanceFactory.abi,
    functionName: "getGovernances",
  });

  useEffect(() => {
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
    <div>
      <div>
        <h1>Explore Page</h1>
      </div>
      <div>
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
