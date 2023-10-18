import { useRouter } from "next/router";
import { useContractRead } from "wagmi";
import Governance from "../../../../public/Governance.json";
import { useEffect, useState } from "react";

function GovernanceDetail() {
  const [governanceAddress, setGovernanceAddress] = useState<string>(""); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const [council, setCouncil] = useState<string[]>([""]);
  const router = useRouter();

  const { data } = useContractRead({
    address: governanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "returnAllCouncil",
  });

  useEffect(() => {
    const { contractAddress } = router.query;
    setGovernanceAddress(contractAddress as string);
  }, []);

  useEffect(() => {
    if (data) {
      setCouncil(data as string[]);
    }
  }, [data]);
  return (
    <div>
      <div>
        <h1 className="text-[30px]">Governance Detail</h1>
      </div>
      <div>
        <p>List of Councils</p>
        <ul>
          {council ? (
            council.map((item, key) => {
              return <li key={key}>{item}</li>;
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div>
        <h1>Active Proposals</h1>
      </div>
      <div>
        <h1>Passed Proposals</h1>
      </div>
      <div>
        <h1>Failed Proposals</h1>
      </div>
    </div>
  );
}

export default GovernanceDetail;
