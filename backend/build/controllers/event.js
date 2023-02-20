"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const slashauth_client_1 = require("../third-party/slashauth_client");
const constants_1 = require("../utils/constants");
class EventController {
    constructor() {
        this.getEventsController = async (clientID) => {
            const { data, error: getRoleErr } = await slashauth_client_1.slashauthClient.app.getRoleRestrictedData({
                role: constants_1.CONSTANTS.MEMBER_ROLE_LEVEL,
            });
            if (getRoleErr) {
                console.error(getRoleErr);
                throw getRoleErr;
            }
            if (!data) {
                throw new Error(`getAppRoleMetadata did not return a result for clientID ${clientID}`);
            }
            const events = data[constants_1.CONSTANTS.EVENTS_KEY];
            return events || [];
        };
        this.putEventController = async (clientID, input) => {
            // Fetch roleMetadata
            const { data, error: getRoleErr } = await slashauth_client_1.slashauthClient.app.getRoleRestrictedData({
                role: constants_1.CONSTANTS.MEMBER_ROLE_LEVEL,
            });
            if (getRoleErr) {
                console.error(getRoleErr);
                throw getRoleErr;
            }
            if (!data) {
                throw new Error(`getAppRoleMetadata did not return a result for clientID ${clientID}`);
            }
            const metadata = data;
            // Check if events already exist. If they do, append. If not, create a new array
            if (metadata[constants_1.CONSTANTS.EVENTS_KEY]) {
                metadata[constants_1.CONSTANTS.EVENTS_KEY].push(input);
            }
            else {
                metadata[constants_1.CONSTANTS.EVENTS_KEY] = [input];
            }
            // Update metadata
            await slashauth_client_1.slashauthClient.app.updateRoleRestrictedData({
                role: constants_1.CONSTANTS.MEMBER_ROLE_LEVEL,
                metadata,
            });
            return input;
        };
    }
}
exports.EventController = EventController;
//# sourceMappingURL=event.js.map