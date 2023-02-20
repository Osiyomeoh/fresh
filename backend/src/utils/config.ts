import { Config } from '../@types/config';
import { ENV } from './constants';

import 'dotenv/config';

const readProdConfig = (): Config => {
  const conf = new Config({
    isDev: false,
    env: 'demo',
    clientID: process.env.CLIENT_ID as string,
    aws: {
      region: 'us-west-2',
      secretsID: ``,
    },
  });

  conf.clientSecret = process.env.CLIENT_SECRET as string;

  return conf;
};

const readLocalConfig = (): Config => {
  const conf = new Config({
    isDev: true,
    env: 'local',
    clientID: process.env.CLIENT_ID as string,
    aws: {
      region: 'us-west-2',
      secretsID: '',
    },
  });

  conf.clientSecret = process.env.CLIENT_SECRET as string;

  return conf;
};

const GetConfig = (): Config => {
  let env = process.env.DEMO_ENV;

  if (!process.env.CLIENT_SECRET) {
    throw new Error('.env file must exist with CLIENT_SECRET and CLIENT_ID');
  }

  switch (env) {
    case ENV.DEMO:
      return readProdConfig();
    case ENV.LOCAL:
    default:
      return readLocalConfig();
  }
};

export const conf = GetConfig();
