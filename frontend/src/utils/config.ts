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
    factory_address: "0x4b4526247b7890ef5f8844de4dd9bf42fa420f4a",
    mailbox_address: "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    pay_master_address: "0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a",
  },
  80001: {
    chainId: 80001,
    factory_address: "0xc228144fc8369b9729202b20a725cd3284178aed",
    mailbox_address: "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    pay_master_address: "0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a",
  },
};
