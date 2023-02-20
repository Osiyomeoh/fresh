"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const slashauth_client_1 = require("../third-party/slashauth_client");
class AppController {
    constructor() {
        /**
         * getAppMetadataController returns the appMetadata to render the home page
         * @param clientID
         * @returns
         */
        this.getAppMetadataController = async (clientID) => {
            const { data, error: getDataErr } = await slashauth_client_1.slashauthClient.app.getInfo();
            if (getDataErr) {
                console.error(getDataErr);
                throw getDataErr;
            }
            if (!data) {
                throw new Error(`getApp did not return a result for clientID ${clientID}`);
            }
            return {
                clientID: data.clientID,
                name: data.name,
                description: data.description,
            };
        };
    }
}
exports.AppController = AppController;
//# sourceMappingURL=app.js.map