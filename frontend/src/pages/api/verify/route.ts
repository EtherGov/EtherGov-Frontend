import { SismoConnect, SismoConnectVerifiedResult,SismoConnectConfig,AuthType } from "@sismo-core/sismo-connect-server";
import type { NextApiRequest, NextApiResponse } from 'next';

import { AUTHS, CLAIMS, SIGNATURE_REQUEST } from "../../../shared/sismo";

const config: SismoConnectConfig = {
  // you will need to register an appId in the Factory
  appId: "0x081d495d9a48438002867986b3fdc187",
}
const sismoConnect = SismoConnect({ config });

// this is the API route that is called by the SismoConnectButton
export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req ", req);

    // const sismoConnectResponse = await req.body;
    const sismoConnectResponse = JSON.parse(req.body);
    console.log("sismoConnectResponse", sismoConnectResponse);

    const result: SismoConnectVerifiedResult = await sismoConnect.verify(
    sismoConnectResponse, {
      auths: AUTHS,//[{ authType: AuthType.VAULT }], 
      claims: CLAIMS,//[{ groupId: "0x9bfaf997efdde9a6372fe679f177a5c1"}],
      signature: SIGNATURE_REQUEST,
    });

    console.log("result", result);
    
    return res.status(200).json(result);
    
  } catch (e: any) {
    console.log("error", e.message);
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}