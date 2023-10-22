import { Card, CardBody, Stack } from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  imgLink: any;
}

const BrowseDATCard = ({ imgLink }: Props) => {
  return (
    <Card
      as="button"
      className="h-[200px] w-[280px] items-center justify-center mx-auto"
      bg="white"
    >
      <CardBody className="items-center justify-center mx-auto">
        <Stack spacing={4} alignItems="center" justifyContent="center">
          <Image src={imgLink} alt="DAO Logo Image" width={200} height={250} />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BrowseDATCard;
