import BrowseDATCard from "../components/Card/BrowseDATCard";
import Navbar from "../components/Navbar/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import BoredApe from "../../public/BoredApe.webp";
import Azuki from "../../public/azuki.jpeg";
import MiladyMaker from "../../public/MiladyMaker.jpeg";
import CryptoPunks from "../../public/CryptoPunks.png";
import Nouns from "../../public/nouns.webp";
import PudgyPenguins from "../../public/PudgyPenguins.jpeg";
import ModalBrowse from "../components/Modal/ModalBrowse";
import { useDisclosure } from "@chakra-ui/react";

function BrowseDAT() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleCouncilClick() {
    console.log("Council was clicked.");
    // Do more things if needed
  }

  function handleVoterClick() {
    console.log("Voter was clicked.");
    // Do more things if needed
  }

  return (
    <div className="h-[3000px] bg-gradient-to-r from-rose-200 to-teal-200">
      <Navbar />
      <div className="w-full mt-4 flex items-center justify-center">
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
      <div className="m-8 container w-3/4 mx-auto grid grid-cols-3 gap-8 justify-center items-center">
        <BrowseDATCard
          imgLink={BoredApe}
          daoName="Bored Ape Yacht Club"
          onClickButton={onOpen}
        />
        <ModalBrowse
          DATName="Bored Ape Yacht Club"
          OnClickCouncil={handleCouncilClick}
          OnClickVoter={handleVoterClick}
          isOpenModal={isOpen}
          onCloseModal={onClose}
        />
        <BrowseDATCard imgLink={Azuki} daoName="Azuki" onClickButton={onOpen} />
        <BrowseDATCard
          imgLink={MiladyMaker}
          daoName="Milady Maker"
          onClickButton={onOpen}
        />
        <BrowseDATCard
          imgLink={CryptoPunks}
          daoName="CryptoPunks"
          onClickButton={onOpen}
        />
        <BrowseDATCard imgLink={Nouns} daoName="Nouns" onClickButton={onOpen} />
        <BrowseDATCard
          imgLink={PudgyPenguins}
          daoName="Pudgy Penguins"
          onClickButton={onOpen}
        />
      </div>
    </div>
  );
}

export default BrowseDAT;
