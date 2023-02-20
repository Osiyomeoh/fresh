"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const slashauth_client_1 = require("../third-party/slashauth_client");
class UserController {
    constructor() {
        /**
         * getMe gets the current user's data
         * @param clientID
         * @param userID
         * @returns
         */
        this.getMe = async (clientID, userID) => {
            const { data: userResp, error: getUserErr } = await slashauth_client_1.slashauthClient.user.getUserByID({
                userID,
            });
            if (getUserErr) {
                console.error(getUserErr);
                throw getUserErr;
            }
            if (!userResp) {
                throw new Error(`getUserByID did not return a result for clientID ${clientID} and user ${userID}`);
            }
            return {
                clientID: userResp.clientID,
                address: userResp.wallet,
                nickname: userResp.nickname,
                roles: userResp.roles,
                metadata: userResp.metadata,
                dateTime: userResp.createdAt,
            };
        };
        /**
         * patchMe allows the current user to update their data
         * @param clientID
         * @param userID
         * @param nickname
         * @returns
         */
        this.patchMe = async (clientID, userID, nickname) => {
            const { data: updateResp, error: updateUserErr } = await slashauth_client_1.slashauthClient.user.updateUserMetadata({
                userID,
                nickname,
            });
            if (updateUserErr) {
                console.error(updateUserErr);
                throw updateUserErr;
            }
            if (!updateResp) {
                throw new Error(`updateUserMetadata did not return a result for clientID ${clientID} and user ${userID}`);
            }
            return {
                clientID: updateResp.clientID,
                address: updateResp.wallet,
                nickname: updateResp.nickname,
                roles: updateResp.roles,
                metadata: updateResp.metadata,
                dateTime: updateResp.createdAt,
            };
        };
        /**
         * getUsers fetches all the users for the clientID
         * @param clientID
         * @param address
         * @param cursor
         * @returns
         */
        this.getUsers = async (clientID, cursor) => {
            let hasMore = true;
            const allUsers = [];
            while (hasMore) {
                const { paginatedResponse: users, error } = await slashauth_client_1.slashauthClient.user.getUsers({
                    cursor,
                });
                if (error) {
                    console.error(error);
                    throw error;
                }
                if (!(users === null || users === void 0 ? void 0 : users.data)) {
                    throw new Error(`getUsers did not return a result for clientID ${clientID}`);
                }
                users.data.forEach((elem) => {
                    allUsers.push({
                        clientID: elem.clientID,
                        address: elem.wallet,
                        nickname: elem.nickname,
                        roles: elem.roles,
                        metadata: elem.metadata,
                        dateTime: elem.createdAt,
                    });
                });
                hasMore = users.pageInfo.hasMore;
                cursor = users.pageInfo.cursor;
            }
            return allUsers;
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map