import { conf } from './utils/config';

export const init = async () => {
  if (!conf.isDev) {
    // Load secrets for conf
    await conf.init();
  }
};
