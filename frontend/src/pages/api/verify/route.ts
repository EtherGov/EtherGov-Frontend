import { SismoConnect, SismoConnectVerifiedResult,SismoConnectConfig, } from "@sismo-core/sismo-connect-server";
import {
  ClaimType,
} from "@sismo-core/sismo-connect-client";
import type { NextApiRequest, NextApiResponse } from 'next';

import { AUTHS,CONFIG, SIGNATURE_REQUEST } from "../../../shared/sismo";

const config: SismoConnectConfig = {
  // you will need to register an appId in the Factory
  appId: "0x081d495d9a48438002867986b3fdc187",
}
const sismoConnect = SismoConnect({config: CONFIG} );

// this is the API route that is called by the SismoConnectButton
export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req ", req);
    console.log("response ", req.body);

    const comethGroupId = req.query.comethGroupId;
    console.log("comethGroupId ", comethGroupId);
    // console.log("Received ID:", id);

    // const sismoConnectResponse = await req.body;
    const sismoConnectResponse = JSON.parse(req.body);
    console.log("sismoConnectResponse", sismoConnectResponse);

    const result: SismoConnectVerifiedResult = await sismoConnect.verify(
    sismoConnectResponse, {
      auths: AUTHS,//[{ authType: AuthType.VAULT }], 
      claims: [
        { groupId: comethGroupId as string,
        claimType: ClaimType.EQ,
        value: 1,}, 
      ],
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