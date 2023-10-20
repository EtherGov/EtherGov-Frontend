import {
  Card,
  Divider,
  Textarea,
  Progress,
  Button,
  Input,
} from "@chakra-ui/react";

function AddProposalParameter() {
  return (
    <div className="h-full">
      <div className="mt-8 w-1/2 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            New Proposal: DAO Parameters
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <h1 className="text-xl font-semibold text-left justify-center mt-2">
            NFT Contract Address:
          </h1>
          <div className="flex flex-row w-full my-1">
            <div className="w-11/12 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="<NFT contract address>"
                value=""
              />
            </div>
            <div className="w-1/12 p-2 bg-transparent">
              <Button>+</Button>
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-11/12 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="<NFT contract address>"
                value=""
              />
            </div>
            <div className="w-1/12 p-2 bg-transparent">
              <Button>-</Button>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-left justify-center mt-2">
            ERC20 Contract Address:
          </h1>
          <div className="flex flex-row w-full my-1">
            <div className="w-11/12 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="<ERC20 contract address>"
                value=""
              />
            </div>
            <div className="w-1/12 p-2 bg-transparent">
              <Button>+</Button>
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-11/12 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="<ERC20 contract address>"
                value=""
              />
            </div>
            <div className="w-1/12 p-2 bg-transparent">
              <Button>-</Button>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-left justify-center mt-2">
            Council List:
          </h1>
          <div className="flex flex-row w-full my-1">
            <div className="w-11/12 p-2 bg-transparent">
              <Textarea
                className="text-md font-medium text-right"
                rows={4}
                cols={70}
                variant="outline"
                borderColor="gray"
                placeholder="Council List..."
                value=""
                readOnly
              />
            </div>
            <div className="w-1/12 p-2 bg-transparent">
              <Button>+</Button>
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-11/12 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="..."
                value=""
              />
            </div>
            <div className="w-1/12 p-2 bg-transparent">
              <Button>-</Button>
            </div>
          </div>
          <div className="flex flex-row w-1/2 mt-6 mx-auto">
            <h1 className="text-md w-1/2 font-semibold text-center justify-center mt-1">
              Min Voting Period:
            </h1>
            <h1 className="text-md w-1/4 font-semibold text-center justify-center">
              <Input
                className="text-md font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="..."
                value="3"
                size="sm"
              />
            </h1>
            <h1 className="text-md w-1/4 font-semibold text-center justify-center mt-1">
              Days
            </h1>
          </div>
          <div className="flex flex-row w-1/2 mt-3 mx-auto">
            <h1 className="text-md w-1/2 font-semibold text-center justify-center mt-1">
              Min Approvals:
            </h1>
            <h1 className="text-md w-1/4 font-semibold text-center justify-center">
              <Input
                className="text-md font-medium text-right"
                width="100%"
                variant="outline"
                borderColor="gray"
                placeholder="..."
                value="100"
                size="sm"
              />
            </h1>
            <h1 className="text-md w-1/4 font-semibold text-center justify-center mt-1">
              Voters
            </h1>
          </div>
          <Button
            bg="black"
            color="white"
            _hover={{ opacity: 0.7 }}
            className="w-1/2 mx-auto my-6 items-center text-center justify-center"
          >
            Propose Changes
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddProposalParameter;
