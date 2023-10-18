export interface Config {
  RPC_URL: string;
  DEPLOY_SAFE: {
    OWNERS: string[];
    THRESHOLD: number;
    SALT_NONCE: number;
  };
}

export interface SafeWallet {
  contract_address: string;
  created_at: string;
  owners: string[];
  hub_module: string;
  hub_contract_address: string;
  hub_guardian: string;
}
