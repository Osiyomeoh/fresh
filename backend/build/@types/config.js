"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor({ isDev, env, clientID, aws }) {
        this._isDev = isDev;
        this._env = env;
        this._clientID = clientID;
        this._aws = aws;
    }
    async init() { }
    get isDev() {
        return this._isDev;
    }
    get env() {
        return this._env;
    }
    get clientID() {
        return this._clientID;
    }
    get aws() {
        return this._aws;
    }
    get clientSecret() {
        if (!this._clientSecret) {
            throw new Error('uninitialized');
        }
        return this._clientSecret;
    }
    set clientSecret(input) {
        this._clientSecret = input;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map