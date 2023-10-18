import BrowseDATCard from "./components/BrowseDATCard";
import Navbar from "./components/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import BoredApe from "../../public/BoredApe.webp";
import Azuki from "../../public/azuki.jpeg";
import MiladyMaker from "../../public/MiladyMaker.jpeg";
import CryptoPunks from "../../public/CryptoPunks.png";
import Nouns from "../../public/nouns.webp";
import PudgyPenguins from "../../public/PudgyPenguins.jpeg";

function BrowseDAT() {
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
        <BrowseDATCard imgLink={BoredApe} daoName="Bored Ape Yacht Club" />
        <BrowseDATCard imgLink={Azuki} daoName="Azuki" />
        <BrowseDATCard imgLink={MiladyMaker} daoName="Milady Maker" />
        <BrowseDATCard imgLink={CryptoPunks} daoName="CryptoPunks" />
        <BrowseDATCard imgLink={Nouns} daoName="Nouns" />
        <BrowseDATCard imgLink={PudgyPenguins} daoName="Pudgy Penguins" />
      </div>
    </div>
  );
}

export default BrowseDAT;
