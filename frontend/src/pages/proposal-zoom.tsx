import { Button, Card, Divider, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Progress } from "@chakra-ui/react";

function ProposalZoom() {
  const [proposalTitle, setProposalTitle] = useState(
    "Deposit 100k DAI for sDAI (Scroll)"
  );
  const [proposalDesc, setProposalDesc] = useState(
    "BAYC's DAT is capitalized with an initial 100k DAI. In this case, depositing this 100k for sDAI in order to earn 5% yield is a risk-free action."
  );

  const [dateEnacted, setDateEnacted] = useState("20/10/2023");

  const [dayPeriod, setDayPeriod] = useState("3 Days");

  return (
    <div className="h-full">
      <div className="mt-8 w-2/3 mx-auto">
        <Card className="my-8 p-8 mx-auto justify-center">
          <h1 className="text-3xl font-semibold text-left justify-center">
            {proposalTitle}
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <h1 className="text-xl font-semibold text-left justify-center mt-2">
            Description:
          </h1>
          <div className="w-full p-2 bg-transparent mt-2">
            <Textarea
              className="text-md font-medium text-left"
              rows={4}
              cols={70}
              variant="outline"
              borderColor="gray"
              placeholder="Description..."
              value={proposalDesc}
              readOnly
            />
          </div>
          <h1 className="text-xl font-semibold text-left justify-center mt-4">
            Proposal Details:
          </h1>
          <div className="flex flex-row mt-2">
            <h1 className="text-md font-medium text-left justify-center">
              Date Enacted:
            </h1>
            <h1 className="text-md font-medium text-left justify-center ml-4">
              {dateEnacted}
            </h1>
          </div>
          <div className="flex flex-row mt-2 mb-8">
            <h1 className="text-md font-medium text-left justify-center">
              Voting Period:
            </h1>
            <h1 className="text-md font-medium text-left justify-center ml-4">
              {dayPeriod}
            </h1>
          </div>
          <Progress value={77} colorScheme="green" />
          <h1 className="text-md text-right justify-center">
            Quorum: 100 Approvals
          </h1>
          <h1 className="text-md text-right justify-center">
            Current: 77 Approvals
          </h1>
          <h1 className="text-xl font-semibold text-center justify-center mt-8">
            Weight: 100 $APE
          </h1>
          <Button
            bg="black"
            color="white"
            _hover={{ opacity: 0.7 }}
            className="w-1/2 mx-auto my-8 items-center text-center justify-center"
          >
            Approve Proposal
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default ProposalZoom;