import { 
    AuthRequest, 
    AuthType, 
    ClaimRequest, 
    ClaimType,
    SismoConnect,
    SismoConnectConfig
  } from "@sismo-core/sismo-connect-client";
  
  const config: SismoConnectConfig = {
    // you will need to get an appId from the Factory
    appId: "0x081d495d9a48438002867986b3fdc187", 
  }
  
  const sismoConnect = SismoConnect({
    config
  })
  
  // auth request for a proof of Twitter account ownership
  const twitterRequest: AuthRequest = { 
      authType: AuthType.TWITTER,
  };
  
  // claim request for a proof of "Nouns DAO Nft holders" group membership
  const nounsDaoRequest: ClaimRequest = { 
      // id of the group nouns-dao-nft-holders
      // https://factory.sismo.io/groups-explorer?search=nouns-dao-nft-holders
      groupId: "0x311ece950f9ec55757eb95f3182ae5e2",
  };
  
  // claim request for a proof of "Gitcoin Passport holders" group membership
    const gitcoinPassportRequest: ClaimRequest = { 
        // id of the group gitcoin-passport-holders
        // https://factory.sismo.io/groups-explorer?search=gitcoin-passport-holders
        groupId: "0x1cde61966decb8600dfd0749bd371f12",
        // users should have at least 15 as value in the group to claim the airdrop
        value: 15,
        claimType: ClaimType.GTE
    };
  
  // redirect users to the Vault App to generate proofs based on the requirements
  // expressed in the auth and claim requests
  sismoConnect.request({
      auth: twitterRequest,
      claims: [nounsDaoRequest, gitcoinPassportRequest],
      namespace: "sismo-edition",
      callbackUrl: "https://my-nft-drop.xyz/sismo-edition/claim-nft"
  })

  