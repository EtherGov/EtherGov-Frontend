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
  const handleCreateRoute = () => {
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
  const handleBrowseRoute = () => {
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
    router.push("/BrowseDAT");
  };

  return (
    <div className="h-[70px] flex justify-between items-center bg-gradient-to-r from-rose-200 to-teal-200">
      <Link href={"/"} className="ml-[30px]" onClick={handleHomeRoute}>
        <Image src={logo} alt="" width={60} height={60} />
      </Link>
      <div className="flex items-center gap-4 mr-[30px]">
        <button
          className="w-[140px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleCreateRoute}
        >
          Create DATs
        </button>
        <button
          className="w-[180px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleBrowseRoute}
        >
          Browse DATs
        </button>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
