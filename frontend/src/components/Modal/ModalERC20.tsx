import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Divider,
  Input,
  Button,
} from "@chakra-ui/react";
import DropdownButtonProfile from "../Button/DropdownButtonProposal";
import { useState } from "react";

interface Props {
  OnClickGeneratePayload: any;
  isOpenModal: boolean;
  onCloseModal: () => void;
}

const ModalERC20 = ({
  OnClickGeneratePayload,
  isOpenModal,
  onCloseModal,
}: Props) => {
  const [amount, setAmount] = useState("");

  const [selectedAsset, setSelectedAsset] = useState("USDC");

  const handleAssetChange = (newDuration: any) => {
    setSelectedAsset(newDuration);
  };

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send ERC20 / NFTs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col">
              <div className="w-full p-2 bg-transparent">
                <Input
                  className="text-sm font-medium text-center"
                  htmlSize={40}
                  width="auto"
                  variant="outline"
                  borderColor="gray"
                  placeholder="paste recipient address"
                  value="~ Recipient Address Here ~"
                  readOnly
                />
              </div>
              <div className="flex flex-row w-full my-1">
                <div className="w-1/4 p-2 bg-transparent">
                  <h1 className="text-md text-left font-semibold mr-4 mt-1">
                    Type:
                  </h1>
                </div>
                <div className="w-2/4 p-2 bg-transparent">
                  <Input
                    className="text-sm font-medium text-right"
                    htmlSize={28}
                    width="auto"
                    variant="outline"
                    borderColor="gray"
                    placeholder="Title..."
                    value="ERC20"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-row w-full my-1">
                <div className="w-1/4 p-2 bg-transparent">
                  <h1 className="text-md text-left font-semibold mr-4 mt-1">
                    Select Asset:
                  </h1>
                </div>
                <div className="w-3/4 p-2 mt-2 bg-transparent">
                  <DropdownButtonProfile
                    values={["USDC", "USDT"]}
                    defaultValue={selectedAsset}
                    onDurationChange={handleAssetChange}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full my-1">
                <div className="w-1/4 p-2 bg-transparent">
                  <h1 className="text-md text-left font-semibold mr-4 mt-1">
                    Token Amount:
                  </h1>
                </div>
                <div className="w-2/4 p-2 mt-2 bg-transparent">
                  <Input
                    className="text-sm font-medium text-right"
                    htmlSize={18}
                    width="auto"
                    variant="outline"
                    borderColor="gray"
                    placeholder="Amount..."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="w-1/4 p-2 mt-3 bg-transparent">
                  <h1 className="text-md text-right font-semibold mr-4 mt-1">
                    {selectedAsset}
                  </h1>
                </div>
              </div>
              <div className="flex justify-center mt-8 mb-6">
                <Button
                  bg="black"
                  color="white"
                  className="w-1/2"
                  _hover={{ opacity: 0.7 }}
                  onClick={OnClickGeneratePayload}
                >
                  Generate Payload
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalERC20;
