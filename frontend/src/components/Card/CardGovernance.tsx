import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

interface CardGovernanceProps {
  address: string;
  name: string;
  // onClickButton: React.MouseEventHandler;
}

export const CardGovernance = ({ address, name }: CardGovernanceProps) => {
  return (
    <Card
      as="button"
      className="h-[150px] w-[450px] items-center justify-center mx-auto"
      bg="white"
      _hover={{ borderColor: "gray.400", borderWidth: "2px" }}
      _focus={{ borderColor: "gray.400", borderWidth: "2px", outline: "none" }}
      borderRadius="md"
    >
      <CardBody>
        <Heading size="md" mb={4}>
          {name}
        </Heading>
        <Divider mb={4} />
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase" color="gray.600">
              Address:
            </Heading>
            <Text pt="2" fontSize="sm" color="gray.600">
              {address}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
