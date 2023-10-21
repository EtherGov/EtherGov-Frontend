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
    factory_address: "0x2dc154fff28794e66bf50607e2f2e508f8511cd7",
    mailbox_address: "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    pay_master_address: "0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a",
  },
  80001: {
    chainId: 80001,
    factory_address: "0xf499b5bfe08a30f5edcc44d9355159e12ec52100",
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
