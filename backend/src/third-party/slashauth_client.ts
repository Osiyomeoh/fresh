import { SlashauthClient } from '@slashauth/node-client';
import { conf } from '../utils/config';

const createSlashauthClient = (): SlashauthClient => {
  if (!conf.clientID || !conf.clientSecret) {
    throw new Error('slashauth client config is not set correctly');
  }

  return new SlashauthClient(conf.clientID, conf.clientSecret, {});
};

export const slashauthClient = createSlashauthClient();
