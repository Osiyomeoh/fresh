"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.patchMe = exports.getMe = void 0;
const controllers_1 = require("../controllers");
const strings_1 = require("../utils/strings");
const getMe = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const { clientID, userID } = request.slashauth;
        if (typeof clientID === 'string' &&
            !(0, strings_1.isEmpty)(clientID) &&
            typeof userID === 'string' &&
            !(0, strings_1.isEmpty)(userID)) {
            const user = await controllers_1.controllers.user.getMe(clientID, userID);
            return response.status(200).json(user);
        }
        return response.sendStatus(403);
    }
    catch (err) {
        return response.sendStatus(400);
    }
};
exports.getMe = getMe;
const patchMe = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const { clientID, userID } = request.slashauth;
        const { nickname } = request.body;
        if (typeof clientID === 'string' &&
            !(0, strings_1.isEmpty)(clientID) &&
            typeof userID === 'string' &&
            !(0, strings_1.isEmpty)(userID) &&
            typeof nickname === 'string' &&
            !(0, strings_1.isEmpty)(nickname)) {
            const user = await controllers_1.controllers.user.patchMe(clientID, userID, nickname);
            return response.status(200).json(user);
        }
        return response.sendStatus(403);
    }
    catch (err) {
        return response.sendStatus(400);
    }
};
exports.patchMe = patchMe;
const getUsers = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const clientID = request.slashauth.clientID;
        const cursor = request.query.cursor;
        if (typeof clientID === 'string' && !(0, strings_1.isEmpty)(clientID)) {
            const users = await controllers_1.controllers.user.getUsers(clientID, cursor);
            return response.status(200).json(users);
        }
        return response.sendStatus(400);
    }
    catch (err) {
        if (err instanceof Error && err.message === 'unauthenticated') {
            return response.sendStatus(403);
        }
        return response.sendStatus(400);
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=user.js.map