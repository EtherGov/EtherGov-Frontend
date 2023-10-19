import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar/Navbar";
import HeroLayout from "../components/HeroLayout/HeroLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <HeroLayout />
    </div>
  );
}
