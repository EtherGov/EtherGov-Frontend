import { useSismoConnect, SismoConnectClientConfig } from "@sismo-core/sismo-connect-react";

const config: SismoConnectClientConfig = { appId: "0xf4977993e52606cfd67b7a1cde717069" };

const { response, responseBytes } = useSismoConnect({ config });