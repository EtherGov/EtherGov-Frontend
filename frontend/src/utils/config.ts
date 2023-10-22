export const envConfigMappings: {
  [chainId: number]: {
    chainId: number;
    factory_address: string;
    mailbox_address: string;
    pay_master_address: string;
  };
} = {
  11155111: {
    chainId: 11155111,
    factory_address: "0x5f7c6B1378966294A2F2175Fcf1bcD877423fcDf",
    mailbox_address: "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    pay_master_address: "0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a",
  },
  80001: {
    chainId: 80001,
    factory_address: "0xaea9b494530337596b05e5b305abed969926e11f",
    mailbox_address: "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    pay_master_address: "0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a",
  },
};

export const chainID = [
  {
    network: "Mumbai",
    chainId: 80001,
  },
  {
    network: "Sepolia",
    chainId: 11155111,
  },
  {
    network: "Scroll SEPOLIA",
    chainId: 534351,
  },
  {
    network: "Mantle Testnet",
    chainId: 5001,
  },
];

export const templateConfig = [
  {
    name: "Spark Protocol",
    token_address: "0x81cBB0aa06cB4ECeB64a1959e29509f109F58C29",
    function_name: "transferFrom(address, address, uint256)",
  },
];
