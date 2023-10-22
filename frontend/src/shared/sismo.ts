import {
    ClaimType,
    AuthType,
    SignatureRequest,
    AuthRequest,
    ClaimRequest,
    SismoConnectConfig,
  } from "@sismo-core/sismo-connect-client";
  
  export { ClaimType, AuthType };

  export const CONFIG: SismoConnectConfig = {
    appId: "0x081d495d9a48438002867986b3fdc187"
  };
  
  // Request users to prove ownership of a Data Source (Wallet, Twitter, Github, Telegram, etc.)
  export const AUTHS: AuthRequest[] = [
    { authType: AuthType.VAULT },
  ];
  
  // Request users to prove membership in a Data Group (e.g I own a wallet that is part of a DAO, owns an NFT, etc.)
  // export const CLAIMS: ClaimRequest[] = [
  //   { groupId: "0xc505a8125fc571896eecdadb908e7706" ,
  //   claimType: ClaimType.EQ,
  //   value: 1,}, 
  // ];
  
  // Request users to sign a message
  export const SIGNATURE_REQUEST: SignatureRequest = {
    message: "I Approve this Proposal",
    // isSelectableByUser: true,
  };