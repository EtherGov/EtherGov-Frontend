import { Card, Divider, Textarea, Button, Input } from "@chakra-ui/react";
import BoredApe1 from "../../public/BoredApe1.png";
import BoredApe2 from "../../public/BoredApe2.png";
import BoredApe3 from "../../public/BoredApe3.jpeg";
import BrowseDATCard from "@/components/Card/BrowseDATCard";

function StakeToVote() {
  return (
    <div className="h-full">
      <div className="mt-8 w-1/2 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            Action: Stake-to-Vote
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <h1 className="text-2xl font-semibold text-center justify-center mt-2">
            NFT Stake
          </h1>
          <div className="w-full flex flex-row gap-4 p-2 bg-transparent mt-2">
            <BrowseDATCard imgLink={BoredApe1} />
            <BrowseDATCard imgLink={BoredApe2} />
            <BrowseDATCard imgLink={BoredApe3} />
          </div>
          <div className="flex flex-row w-1/2 mt-3 mx-auto">
            <h1 className="text-md w-1/2 font-semibold text-center justify-center mt-1">
              Lock Duration:
            </h1>
            <h1 className="text-md w-1/4 font-semibold text-center justify-center">
              <Input
                className="text-md font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="..."
                value="18"
                size="sm"
                readOnly
              />
            </h1>
            <h1 className="text-md w-1/4 font-semibold text-center justify-center mt-1">
              Days
            </h1>
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <h1 className="text-2xl font-semibold text-center justify-center mt-6">
            Bond ERC20 to NFT
          </h1>
          <div className="flex flex-row w-1/2 mt-3 mx-auto">
            <h1 className="text-md w-1/2 font-semibold text-center justify-center mt-1">
              Input Amount:
            </h1>
            <h1 className="text-md w-1/4 font-semibold text-center justify-center">
              <Input
                className="text-md font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="0"
                size="sm"
              />
            </h1>
            <h1 className="text-md w-1/4 font-semibold text-center justify-center mt-1">
              $APE
            </h1>
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <Button
            bg="black"
            color="white"
            _hover={{ opacity: 0.7 }}
            className="w-1/2 mx-auto my-6 items-center text-center justify-center"
          >
            Confirm Selection
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default StakeToVote;
