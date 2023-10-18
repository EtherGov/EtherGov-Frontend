import { env } from "@/shared/environment";
import { useContractRead } from "wagmi";
import GovernanceFactory from "../../public/GovernanceFactory.json";
import { useEffect, useState } from "react";
import { CardGovernance } from "@/components/Card/CardGovernance";
import { useRouter } from "next/router";

function ExplorePage() {
  const [governanceAddress, setGovernanceAddress] = useState<string[]>([]); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const router = useRouter();
  const { data } = useContractRead({
    address: "0x41f900be467060a3af9f02ffb44e36f0cebb02a3",
    abi: GovernanceFactory.abi,
    functionName: "getGovernance",
  });

  useEffect(() => {
    console.log(data);
    setGovernanceAddress(data as string[]);
  }, []);

  const handleRoute = (address: string) => {
    router.push(`/governance/details/${address}`);
  };

  return (
    <div>
      <div>
        <h1>Explore Page</h1>
      </div>
      <div>
        {governanceAddress ? (
          governanceAddress.map((item, key) => {
            return (
              <div
                key={key}
                onClick={() => {
                  handleRoute(item);
                }}
              >
                <CardGovernance address={item} />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
