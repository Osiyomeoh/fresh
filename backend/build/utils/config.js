"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conf = void 0;
const config_1 = require("../@types/config");
const constants_1 = require("./constants");
require("dotenv/config");
const readProdConfig = () => {
    const conf = new config_1.Config({
        isDev: false,
        env: 'demo',
        clientID: process.env.CLIENT_ID,
        aws: {
            region: 'us-west-2',
            secretsID: ``,
        },
    });
    conf.clientSecret = process.env.CLIENT_SECRET;
    return conf;
};
const readLocalConfig = () => {
    const conf = new config_1.Config({
        isDev: true,
        env: 'local',
        clientID: process.env.CLIENT_ID,
        aws: {
            region: 'us-west-2',
            secretsID: '',
        },
    });
    conf.clientSecret = process.env.CLIENT_SECRET;
    return conf;
};
const GetConfig = () => {
    let env = process.env.DEMO_ENV;
    if (!process.env.CLIENT_SECRET) {
        throw new Error('.env file must exist with CLIENT_SECRET and CLIENT_ID');
    }
    switch (env) {
        case constants_1.ENV.DEMO:
            return readProdConfig();
        case constants_1.ENV.LOCAL:
        default:
            return readLocalConfig();
    }
};
exports.conf = GetConfig();
//# sourceMappingURL=config.js.map