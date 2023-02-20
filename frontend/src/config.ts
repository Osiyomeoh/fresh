import { decodeCaseSensitiveClientID } from './util/id';

export type Web3Network = 'ethMainnet' | 'ethRinkeby';

const appIDRegex = /^([^\\.]+)\.demo\.slashauth\.xyz$/;

const FALLBACK_APP_ID = 'Q8XH-kI6lvFBUutG';

const extractClientID = () => {
  if (process.env.REACT_APP_APP_ID && process.env.REACT_APP_APP_ID.length > 0) {
    return process.env.REACT_APP_APP_ID;
  }

  if (!window.location) {
    return FALLBACK_APP_ID;
  }

  const match = window.location.host.match(appIDRegex);
  if (match && match.length > 1) {
    return decodeCaseSensitiveClientID(match[1]);
  }

  return FALLBACK_APP_ID;
};

export type FeatureFlags = {
  userManagementEnabled: boolean;
  organizationsEnabled: boolean;
};

export type Config = {
  appEndpoint: () => string;
  restDomain: string;
  appClientID: string;
  featureFlags: FeatureFlags;
};

export const emptyConfig: Config = {
  appEndpoint: () => '',
  restDomain: '',
  appClientID: '',
  featureFlags: {
    userManagementEnabled: true,
    organizationsEnabled: false,
  },
};

const localConfig: Config = {
  appEndpoint: () => 'http://localhost:3000',
  restDomain: 'http://localhost:8080',
  appClientID: extractClientID(),
  featureFlags: {
    userManagementEnabled: true,
    organizationsEnabled: true,
  },
};

const prodConfig: Config = {
  appEndpoint: () => `https://${extractClientID()}.demo.slashauth.xyz`,
  restDomain: 'https://api.demo.slashauth.xyz',
  appClientID: extractClientID(),
  featureFlags: {
    userManagementEnabled: true,
    organizationsEnabled: true,
  },
};

const getConfig = (): Config => {
  if (process.env.REACT_APP_ENVIRONMENT === 'prod') {
    return prodConfig;
  } else {
    return localConfig;
  }
};

export { prodConfig, getConfig };
