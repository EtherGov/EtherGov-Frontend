import { SismoConnect, SismoConnectVerifiedResult,SismoConnectConfig, } from "@sismo-core/sismo-connect-server";
import {
  ClaimType,
} from "@sismo-core/sismo-connect-client";
import type { NextApiRequest, NextApiResponse } from 'next';

import { AUTHS, SIGNATURE_REQUEST } from "../../../shared/sismo";
import { useState } from "react";



// this is the API route that is called by the SismoConnectButton
export default async function HandleRequest(req: NextApiRequest, res: NextApiResponse) {

  const comethGroupId = req.query.comethGroupId as string;
  const comethWallet = req.query.comethWallet as string;


  try {
    console.log("comethWallet", comethWallet)
    const config: SismoConnectConfig = comethWallet !== "null"
    ? {
        appId: "0x081d495d9a48438002867986b3fdc187",
        vault: { impersonate: [comethWallet] }
      }
    : {
        appId: "0x081d495d9a48438002867986b3fdc187"
      };

    const sismoConnect = SismoConnect({config:config} );

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
    return res.status(500).json({ error: e.message, comethWallet });
  }
}