import { useRouter } from "next/router";
import { useContractRead } from "wagmi";
import Governance from "../../../../public/Governance.json";
import { useEffect, useState } from "react";

function GovernanceDetail() {
  const [governanceAddress, setGovernanceAddress] = useState<string>(""); // ["0x00ABdb2FbBC763B6B4A8700E10550Ad74daC4d43"
  const router = useRouter();

  const { data } = useContractRead({
    address: governanceAddress as `0x${string}`,
    abi: Governance.abi,
    functionName: "proposals",
  });

  useEffect(() => {
    const { contractAddress } = router.query;
    setGovernanceAddress(contractAddress as string);
    console.log(data);
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-[30px]">Governance Detail</h1>
      </div>
    </div>
  );
}

export default GovernanceDetail;
