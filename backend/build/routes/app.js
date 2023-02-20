"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppMetadata = void 0;
const controllers_1 = require("../controllers");
const constants_1 = require("../utils/constants");
const strings_1 = require("../utils/strings");
const getAppMetadata = async (request, response) => {
    try {
        const clientID = request.headers[constants_1.CONSTANTS.CLIENT_ID_HEADER];
        if (typeof clientID === 'string' && !(0, strings_1.isEmpty)(clientID)) {
            // const appMetadata = await getAppMetadataController(clientID);
            const appMetadata = await controllers_1.controllers.app.getAppMetadataController(clientID);
            return response.status(200).json(appMetadata);
        }
        return response.sendStatus(400);
    }
    catch (err) {
        return response.sendStatus(400);
    }
};
exports.getAppMetadata = getAppMetadata;
//# sourceMappingURL=app.js.map