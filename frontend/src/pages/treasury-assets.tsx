import { Card, Divider, Button } from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import DAI_logo from "../../public/DAI_logo.png"
import sDAI_logo from "../../public/sDAI_logo.jpeg"
import Image from "next/image";

function TreasuryAssets() {
  return (
    <div className="h-full">
      <div className="mt-8 w-2/3 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            Treasury Assets
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex flex-row mt-4 gap-8">
            <div className="flex flex-col w-full gap-8">
              <h1 className="text-2xl font-bold text-center underline justify-center">
                LIQUID
              </h1>
              <Card className="w-10/12 mx-auto">
                <div className="flex flex-row mt-4 mx-8">
                <FaEthereum className="mr-2 text-lg mt-1"/>
                  <h1 className="text-lg w-1/2 font-bold text-left justify-center">
                    ETH
                  </h1>
                  <h1 className="text-lg w-1/2 font-bold text-right justify-center">
                    5.01
                  </h1>
                </div>
                <Divider
                  colorScheme="gray"
                  className="my-2 mx-auto"
                  width="90%"
                />
                <div className="flex flex-row mt-2 mx-8">
                  <h1 className="text-md w-1/2 text-left justify-center">
                    Mantle
                  </h1>
                  <h1 className="text-md w-1/2 text-right justify-center">
                    3.95
                  </h1>
                </div>
                <div className="flex flex-row mt-4 mx-8 mb-4">
                  <h1 className="text-md w-1/2 text-left justify-center">
                    Scroll
                  </h1>
                  <h1 className="text-md w-1/2 text-right justify-center">
                    1.06
                  </h1>
                </div>
              </Card>
              <Card className="w-10/12 mx-auto">
                <div className="flex flex-row mt-4 mx-8">
                <Image src={sDAI_logo} alt="" width={30} height={10} />
                  <h1 className="ml-2 text-lg w-1/2 font-bold text-left justify-center">
                    sDAI
                  </h1>
                  <h1 className="text-lg w-1/2 font-bold text-right justify-center">
                    100,000.00
                  </h1>
                </div>
                <Divider
                  colorScheme="gray"
                  className="my-2 mx-auto"
                  width="90%"
                />
                <div className="flex flex-row mt-2 mx-8 mb-4">
                  <h1 className="text-md w-1/2 text-left justify-center">
                    Scroll
                  </h1>
                  <h1 className="text-md w-1/2 text-right justify-center">
                    100,000.00
                  </h1>
                </div>
              </Card>
            </div>
            <div className="flex flex-col w-full gap-8">
              <h1 className="text-2xl font-bold text-center underline justify-center">
                LOCKED
              </h1>
              <Card className="w-10/12 mx-auto">
                <div className="flex flex-row mt-4 mx-8">
                <Image src={DAI_logo} alt="" width={30} height={10} />
                  <h1 className="ml-2 text-lg w-1/2 font-bold text-left justify-center">
                    DAI
                  </h1>
                  <h1 className="text-lg w-1/2 font-bold text-right justify-center">
                    100,000.00
                  </h1>
                </div>
                <Divider
                  colorScheme="gray"
                  className="my-2 mx-auto"
                  width="90%"
                />
                <div className="flex flex-row mt-2 mx-8 mb-4">
                  <h1 className="text-md w-1/2 text-left justify-center">
                    Scroll
                  </h1>
                  <h1 className="text-md w-1/2 text-right justify-center">
                    100,000.00
                  </h1>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TreasuryAssets;
