import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/EtherGov_Logo.png";
import router, { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useToast } from "@chakra-ui/react";

const Navbar = () => {
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();

  const toast = useToast();

  const handleHomeRoute = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }
    router.push("/");
  };
  const handleRegisterRoute = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }
    router.push("/RegisterDomain");
  };
  const handleMarketplaceRoute = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }
    router.push("/Marketplace");
  };
  const handleProfileRoute = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }
    router.push("/Profile");
  };

  return (
    <div className="h-[70px] flex justify-between items-center bg-gradient-to-r from-rose-200 to-teal-200">
      <Link href={"/"} className="ml-[30px]">
        <Image src={logo} alt="" width={60} height={60} />
      </Link>
      <div className="flex items-center gap-4 mr-[30px]">
        <button
          className="w-[100px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleHomeRoute}
        >
          Home
        </button>
        <button
          className="w-[180px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleRegisterRoute}
        >
          Register a Domain
        </button>

        <button
          className="w-[130px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleMarketplaceRoute}
        >
          Marketplace
        </button>
        <button
          className="w-[100px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleProfileRoute}
        >
          Profile
        </button>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
