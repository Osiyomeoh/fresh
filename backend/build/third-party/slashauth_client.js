"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashauthClient = void 0;
const node_client_1 = require("@slashauth/node-client");
const config_1 = require("../utils/config");
const createSlashauthClient = () => {
    if (!config_1.conf.clientID || !config_1.conf.clientSecret) {
        throw new Error('slashauth client config is not set correctly');
    }
    return new node_client_1.SlashauthClient(config_1.conf.clientID, config_1.conf.clientSecret, {});
};
exports.slashauthClient = createSlashauthClient();
//# sourceMappingURL=slashauth_client.js.map