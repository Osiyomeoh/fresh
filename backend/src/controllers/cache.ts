import NodeCache from 'node-cache';
import { CONSTANTS } from '../utils/constants';

export const localCache = new NodeCache({
  stdTTL: CONSTANTS.CACHE_TTL,
  checkperiod: CONSTANTS.CACHE_TTL * 0.2,
});
