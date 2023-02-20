"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.updateFile = exports.createFile = exports.listFiles = exports.getPresignedURLForFile = void 0;
const controllers_1 = require("../controllers");
const strings_1 = require("../utils/strings");
const getPresignedURLForFile = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const clientID = request.slashauth.clientID;
        const fileID = request.params.fileID;
        if (clientID && !(0, strings_1.isEmpty)(clientID) && !(0, strings_1.isEmpty)(fileID)) {
            const fileURL = await controllers_1.controllers.file.getPresignedURLForFile(clientID, fileID);
            return response.status(200).json({ data: { url: fileURL } });
        }
        return response.sendStatus(403);
    }
    catch (err) {
        return response.sendStatus(400);
    }
};
exports.getPresignedURLForFile = getPresignedURLForFile;
const listFiles = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const clientID = request.slashauth.clientID;
        const cursor = request.query.cursor;
        if (clientID && !(0, strings_1.isEmpty)(clientID)) {
            const files = await controllers_1.controllers.file.listFiles(clientID, cursor);
            return response.status(200).json({ data: files });
        }
        return response.sendStatus(403);
    }
    catch (err) {
        console.error('err: ', err);
        return response.sendStatus(400);
    }
};
exports.listFiles = listFiles;
const createFile = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const { clientID, userID } = request.slashauth;
        const file = request.file;
        const { name, roles_required, description } = request.body;
        const rolesRequired = JSON.parse(roles_required);
        if (clientID &&
            !(0, strings_1.isEmpty)(clientID) &&
            userID &&
            !(0, strings_1.isEmpty)(userID) &&
            !(0, strings_1.isEmpty)(name) &&
            rolesRequired &&
            file) {
            const fileRecord = await controllers_1.controllers.file.createFile(clientID, userID, {
                name,
                rolesRequired,
                description,
                file,
            });
            return response.status(200).json({ data: fileRecord });
        }
        return response.sendStatus(403);
    }
    catch (err) {
        console.error('err: ', err);
        return response.sendStatus(400);
    }
};
exports.createFile = createFile;
const updateFile = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const clientID = request.slashauth.clientID;
        const fileID = request.params.fileID;
        const { name, roles_required, description } = request.body;
        if (clientID && !(0, strings_1.isEmpty)(clientID) && !(0, strings_1.isEmpty)(fileID)) {
            const file = await controllers_1.controllers.file.updateFile(clientID, fileID, {
                name,
                rolesRequired: roles_required,
                description,
            });
            return response.status(200).json({ data: file });
        }
        return response.sendStatus(403);
    }
    catch (err) {
        console.error('err: ', err);
        return response.sendStatus(400);
    }
};
exports.updateFile = updateFile;
const deleteFile = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const clientID = request.slashauth.clientID;
        const fileID = request.params.fileID;
        if (clientID && !(0, strings_1.isEmpty)(clientID) && !(0, strings_1.isEmpty)(fileID)) {
            const file = await controllers_1.controllers.file.deleteFile(clientID, fileID);
            return response.status(200).json({ data: file });
        }
        return response.sendStatus(403);
    }
    catch (err) {
        console.error('err: ', err);
        return response.sendStatus(400);
    }
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=file.js.map