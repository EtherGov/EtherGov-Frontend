import { SafeWallet } from "@/utils/interface";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface CardProps {
  safe: SafeWallet;
}

export const CardComponent = ({ safe }: CardProps) => {
  const router = useRouter();
  const handleRoute = () => {
    router.push(`/user/wallet/deploy-module/${safe.contract_address}`);
  };
  const handleRouteDetails = () => {
    router.push(`/user/wallet/details/${safe.contract_address}`);
  };
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{safe.contract_address}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Owners
            </Heading>
            <Text pt="2" fontSize="sm">
              {safe.owners.join(", ")}
            </Text>
          </Box>
          {safe.hub_contract_address ? (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Hub Contract Address
              </Heading>
              <Text pt="2" fontSize="sm">
                {safe.hub_contract_address}
              </Text>
            </Box>
          ) : (
            <Box>
              <Button onClick={handleRoute}>Deploy Module</Button>
            </Box>
          )}
          {safe.hub_module ? (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Hub Module
              </Heading>
              <Text pt="2" fontSize="sm">
                {safe.hub_module}
              </Text>
            </Box>
          ) : (
            <Box>
              <Button onClick={handleRouteDetails}>Details</Button>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};
