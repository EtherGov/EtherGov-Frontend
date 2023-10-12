import * as LitJsSdk from "@lit-protocol/lit-node-client";

const litNodeClient = new LitJsSdk.LitNodeClient({
  alertWhenUnauthorized: false,
  litNetwork: "serrano",
  debug: true,
});

export const runLit = async () => {
  const litNodeClient = new LitJsSdk.LitNodeClient({
    alertWhenUnauthorized: false,
    litNetwork: "serrano",
    debug: true,
  });

  await litNodeClient.connect();

  //   const authSig = await getAuthSig();

  //   const walletClient = await getWalletClient();

  //   const hash = hashMessage("test");

  //   const data = await walletClient?.signMessage({ message: { raw: hash } });

  //   if (!data) return;

  //   const publicKey = await recoverPublicKey({
  //     hash: hash,
  //     signature: data,
  //   });

  //   console.log(publicKey);

  // const signatures = await litNodeClient.executeJs({
  //   code: litActionCode,
  //   authSig,
  //   // all jsParams can be used anywhere in your litActionCode
  //   jsParams: {
  //     // this is the string "Hello World" for testing
  //     toSign: [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100],
  //     publicKey:
  //       "0x02e5896d70c1bc4b4844458748fe0f936c7919d7968341e391fb6d82c258192e64",
  //     sigName: "sig1",
  //   },
  // });
};
