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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import DropdownButtonProfile from "../Button/DropdownButtonProposal";
import { useState } from "react";

interface Props {
  OnClickGeneratePayloadsDAI: any;
  OnClickGeneratePayloadMarket: any;
  isOpenModal: boolean;
  onCloseModal: () => void;
}

const ModalSpark = ({
  OnClickGeneratePayloadMarket,
  OnClickGeneratePayloadsDAI,
  isOpenModal,
  onCloseModal,
}: Props) => {
  const [amountDAI, setAmountDAI] = useState("");
  const [amountMarket, setAmountMarket] = useState("");

  const [selectedOpsDAI, setSelectedOpsDAI] = useState("Deposit");
  const [selectedTokenDAI, setSelectedTokenDAI] = useState("DAI");
  const [selectedOpsMarket, setSelectedOpsMarket] = useState("Supply");
  const [selectedAssetMarket, setSelectedAssetMarket] = useState("ETH");

  const handleOpsDAIChange = (newDuration: any) => {
    setSelectedOpsDAI(newDuration);
  };

  const handleTokenDAIChange = (newDuration: any) => {
    setSelectedTokenDAI(newDuration);
  };

  const handleOpsMarketChange = (newDuration: any) => {
    setSelectedOpsMarket(newDuration);
  };

  const handleAssetMarketChange = (newDuration: any) => {
    setSelectedAssetMarket(newDuration);
  };

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Spark Protocol</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted variant="enclosed">
              <TabList>
                <Tab>sDAI</Tab>
                <Tab>Markets</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div className="flex flex-col">
                    <div className="flex flex-row w-full my-1">
                      <div className="w-1/3 p-2 bg-transparent">
                        <h1 className="text-md text-left font-semibold mr-4 mt-1">
                          Select Operation:
                        </h1>
                      </div>
                      <div className="w-2/3 p-2 mt-2 bg-transparent">
                        <DropdownButtonProfile
                          values={["Deposit", "Withdraw"]}
                          defaultValue={selectedOpsDAI}
                          onDurationChange={handleOpsDAIChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full my-1">
                      <div className="w-1/3 p-2 bg-transparent">
                        <h1 className="text-md text-left font-semibold mr-4 mt-1">
                          Select Token:
                        </h1>
                      </div>
                      <div className="w-2/3 p-2 mt-2 bg-transparent">
                        <DropdownButtonProfile
                          values={["DAI", "sDAI"]}
                          defaultValue={selectedTokenDAI}
                          onDurationChange={handleTokenDAIChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full my-1">
                      <div className="w-1/3 p-2 bg-transparent">
                        <h1 className="text-md text-left font-semibold mr-4 mt-1">
                          Token Amount:
                        </h1>
                      </div>
                      <div className="w-1/3 p-2 mt-2 bg-transparent">
                        <Input
                          className="text-sm font-medium text-right"
                          htmlSize={12}
                          width="auto"
                          variant="outline"
                          borderColor="gray"
                          placeholder="Amount..."
                          value={amountDAI}
                          onChange={(e) => setAmountDAI(e.target.value)}
                        />
                      </div>
                      <div className="w-1/3 p-2 mt-3 bg-transparent">
                        <h1 className="text-md text-right font-semibold mr-4 mt-1">
                          {selectedTokenDAI}
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center mt-10">
                      <Button
                        bg="black"
                        color="white"
                        className="w-2/3"
                        _hover={{ opacity: 0.7 }}
                        onClick={OnClickGeneratePayloadsDAI}
                      >
                        Generate Payload
                      </Button>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="flex flex-col">
                    <div className="flex flex-row w-full my-1">
                      <div className="w-1/3 p-2 bg-transparent">
                        <h1 className="text-md text-left font-semibold mr-4 mt-1">
                          Select Operation:
                        </h1>
                      </div>
                      <div className="w-2/3 p-2 mt-2 bg-transparent">
                        <DropdownButtonProfile
                          values={["Supply", "Lend"]}
                          defaultValue={selectedOpsDAI}
                          onDurationChange={handleOpsMarketChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full my-1">
                      <div className="w-1/3 p-2 bg-transparent">
                        <h1 className="text-md text-left font-semibold mr-4 mt-1">
                          Select Asset:
                        </h1>
                      </div>
                      <div className="w-2/3 p-2 mt-2 bg-transparent">
                        <DropdownButtonProfile
                          values={["ETH", "DAI", "USDC"]}
                          defaultValue={selectedAssetMarket}
                          onDurationChange={handleAssetMarketChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full my-1">
                      <div className="w-1/3 p-2 bg-transparent">
                        <h1 className="text-md text-left font-semibold mr-4 mt-1">
                          Token Amount:
                        </h1>
                      </div>
                      <div className="w-1/3 p-2 ml-4 mt-2 bg-transparent">
                        <Input
                          className="text-sm font-medium text-right"
                          htmlSize={12}
                          width="auto"
                          variant="outline"
                          borderColor="gray"
                          placeholder="Amount..."
                          value={amountMarket}
                          onChange={(e) => setAmountMarket(e.target.value)}
                        />
                      </div>
                      <div className="w-1/3 p-2 ml-4 mt-3 bg-transparent">
                        <h1 className="text-md text-right font-semibold mr-4 mt-1">
                          {selectedAssetMarket}
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center mt-10">
                      <Button
                        bg="black"
                        color="white"
                        className="w-2/3"
                        _hover={{ opacity: 0.7 }}
                        onClick={OnClickGeneratePayloadMarket}
                      >
                        Generate Payload
                      </Button>
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSpark;
