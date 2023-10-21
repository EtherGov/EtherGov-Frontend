import { Button } from "@chakra-ui/react";
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import TestExecute from "../../public/TestExecute.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function ExecuteTransactionPage() {
  const [recepient, setRecepient] = useState<any>("");
  const [encodedPayload, setEncodedPayload] = useState<any>("");
  const [value, setValue] = useState<any>("");

  const { config } = usePrepareContractWrite({
    address: "0x29aec73985509c5539ead48a0576b9febfd0c70b",
    abi: TestExecute.abi,
    functionName: "execute",
    value: value,
    args: [80001, recepient, encodedPayload],
  });

  const encodePayload = () => {
    const value = [
      534351,
      "0x81cBB0aa06cB4ECeB64a1959e29509f109F58C29", //token address
      100,
      "transferFrom(address, address, uint256)",
      "TRANSFER",
      "0x981858eFA86aB7Fb614DC3b554B43d13F22c03f5", //mumbai
      "0xcA51855FBA4aAe768DCc273349995DE391731e70", //address of the same network
    ];
    const type = [
      "uint256",
      "address",
      "uint256",
      "string",
      "string",
      "address",
      "address",
    ];
    const encoding = ethers.utils.defaultAbiCoder.encode(type, value);
    setEncodedPayload(encoding);
  };

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleClick = () => {
    if (write) {
      write();
    }
  };

  const unwatch = useContractEvent({
    address: "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    abi: TestExecute.abi,
    eventName: "DispatchId",
    listener: async (event) => {
      console.log(event[1].topics[1]);
      unwatch?.();
    },
  });

  useEffect(() => {
    setRecepient(
      ethers.utils.hexZeroPad("0x8044aa5d743a49bd1913cef81a828cda1453b39a", 32)
    );
    encodePayload();
    const etherValue = ethers.utils.parseEther("0.01");
    const bigIntValue = BigInt(etherValue.toString());
    setValue(bigIntValue);
  }, []);

  return (
    <div>
      <div>Execute Payload</div>
      <div>
        <Button onClick={handleClick}>Execute</Button>
      </div>
    </div>
  );
}

export default ExecuteTransactionPage;
