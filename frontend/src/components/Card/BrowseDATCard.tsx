import { Card, CardBody, Stack } from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  imgLink: any;
  daoName: string;
  onClickButton: React.MouseEventHandler;
}

const BrowseDATCard = ({ imgLink, daoName, onClickButton}: Props) => {
  return (
    <Card
      as="button"
      className="h-[300px] w-[280px] items-center justify-center mx-auto"
      bg="white"
      onClick={onClickButton}
    >
      <CardBody className="items-center justify-center mx-auto">
        <Stack spacing={4} alignItems="center" justifyContent="center">
          <Image src={imgLink} alt="DAT Logo Image" width={200} height={250} />
          <text className="text-xl font-semibold">
            {daoName}
          </text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BrowseDATCard;
