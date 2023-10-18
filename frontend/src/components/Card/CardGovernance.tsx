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
}

export const CardGovernance = ({ address }: CardGovernanceProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Governance</Heading>
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
