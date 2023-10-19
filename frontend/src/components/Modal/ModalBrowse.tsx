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
} from "@chakra-ui/react";

interface Props {
  DATName: string;
  OnClickCouncil: any;
  OnClickVoter: any;
  isOpenModal: boolean; // Add this
  onCloseModal: () => void;
}

const ModalBrowse = ({
  DATName,
  OnClickCouncil,
  OnClickVoter,
  isOpenModal,
  onCloseModal,
}: Props) => {
  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent style={{ background: 'linear-gradient(to right, #FFC1E1, #4FD1C5)' }}>
          <ModalHeader>{DATName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider className="mb-2"/>
            <Stack spacing={4} alignItems="center" justifyContent="center">
              <text className="text-lg font-semibold">I am a...</text>
              <button
                className="w-1/2 border-2 py-2 border-slate-300 bg-transparent text-md text-gray-500 font-semibold rounded-lg shadow-md hover:bg-teal-50 flex items-center justify-center"
                onClick={OnClickCouncil}
              >
                Council
              </button>
              <button
                className="w-1/2 border-2 py-2 border-slate-300 bg-transparent text-md text-gray-500 font-semibold rounded-lg shadow-md hover:bg-teal-50 flex items-center justify-center mb-4"
                onClick={OnClickVoter}
              >
                Voter
              </button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalBrowse;
