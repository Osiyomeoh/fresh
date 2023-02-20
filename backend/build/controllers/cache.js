"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const constants_1 = require("../utils/constants");
exports.localCache = new node_cache_1.default({
    stdTTL: constants_1.CONSTANTS.CACHE_TTL,
    checkperiod: constants_1.CONSTANTS.CACHE_TTL * 0.2,
});
//# sourceMappingURL=cache.js.map