"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const config_1 = require("./utils/config");
const init = async () => {
    if (!config_1.conf.isDev) {
        // Load secrets for conf
        await config_1.conf.init();
    }
};
exports.init = init;
//# sourceMappingURL=init.js.map