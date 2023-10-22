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
    factory_address: "0x6de6fa60a4a927174cd7e8a9a738c01487e555c1",
    mailbox_address: "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    pay_master_address: "0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a",
  },
  80001: {
    chainId: 80001,
    factory_address: "0xf03b6d96277abba8827e2742737cd8b8036af208",
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
