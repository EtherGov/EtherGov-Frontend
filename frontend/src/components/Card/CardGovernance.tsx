import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

interface CardGovernanceProps {
  address: string;
  name: string;
}

export const CardGovernance = ({ address, name }: CardGovernanceProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{name}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Address
            </Heading>
            <Text pt="2" fontSize="sm">
              {address}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
