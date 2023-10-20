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
import { useState } from "react";

interface Props {
  OnClickConfirm: any;
  isOpenModal: boolean;
  onCloseModal: () => void;
}

const ModalCustomPayload = ({
    OnClickConfirm,
    isOpenModal,
    onCloseModal
  } : Props) => {

    const [customPayload, setCustomPayload] = useState("");

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col">
              <div className="w-full p-2 bg-transparent">
                <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                  [Advanced] Custom Payload:
                </h1>
              </div>
              <div className="w-full p-2 bg-transparent">
                <Input
                  className="text-sm font-medium text-center"
                  htmlSize={40}
                  width="auto"
                  variant="outline"
                  borderColor="gray"
                  placeholder="Insert Bytes Calldata..."
                  value={customPayload}
                  onChange={(e) => setCustomPayload(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-8 mb-4">
                <Button
                  bg="black"
                  color="white"
                  className="w-1/2"
                  _hover={{ opacity: 0.7 }}
                  onClick={OnClickConfirm}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCustomPayload;
