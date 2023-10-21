import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar/Navbar";
import HeroLayout from "../components/HeroLayout/HeroLayout";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const [encodedMessage, setEncodedMessage] = useState('');
  const encodeMessage = (message) => {
    try {
      // We assume the message is a simple string; adjust as needed for other types
      const types = ['string'];
      const values = [message];

      // 'defaultAbiCoder' is a pre-instantiated instance of AbiCoder from ethers
      const abiEncodedMessage = ethers.utils.defaultAbiCoder.encode(types, values);

      setEncodedMessage(abiEncodedMessage);
      return abiEncodedMessage; // for use elsewhere
    } catch (error) {
      console.error("Encoding error", error);
      return null;
    }
  };

  useEffect(() => {
    // A sample message to encode
    const sampleMessage = "Example proposal message";
    
    // Encoding the message (the function returns the encoded data, but it's also stored in state)
    const result = encodeMessage(sampleMessage);

    console.log(result)

    // If you want to do something with the encoded message right after setting it, you can call a function here
    // or include additional logic as needed.
  }, []); // Empty dependency array means this useEffect runs once when the component mounts


  return (
    <div>
      <HeroLayout />
    </div>
  );
}
