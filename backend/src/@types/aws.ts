export type WalletSecrets = {
  ETH_WALLET_PK: string;
  ETH_WALLET: string;
};

export type Secrets = {
  CLIENT_SECRET: string;
  QUICKNODE_ENDPOINT_API_KEY: string;
  QN_ETHEREUM_API_KEY: string;
  QN_RINKEBY_API_KEY: string;
  QN_POLYGON_API_KEY: string;
  QN_MUMBAI_API_KEY: string;
};

export type KMSEncryptContext = {
  clientID: string;
  environment: string;
};
