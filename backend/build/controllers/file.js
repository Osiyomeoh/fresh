"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const slashauth_client_1 = require("../third-party/slashauth_client");
class FileController {
    constructor() {
        this.getPresignedURLForFile = async (clientID, fileID) => {
            const { data: fileURL, error: getUrlErr } = await slashauth_client_1.slashauthClient.file.getPresignedURL({
                id: fileID,
            });
            if (getUrlErr) {
                console.error(getUrlErr);
                throw getUrlErr;
            }
            if (!fileURL) {
                throw new Error(`getPresignedURL did not return a result for clientID ${clientID} and fileID ${fileID}`);
            }
            return fileURL;
        };
        this.listFiles = async (clientID, cursor) => {
            const { paginatedResponse: files, error: listFilesErr } = await slashauth_client_1.slashauthClient.file.listFiles({
                cursor,
            });
            if (listFilesErr) {
                console.error(listFilesErr);
                throw listFilesErr;
            }
            if (!(files === null || files === void 0 ? void 0 : files.data)) {
                throw new Error(`listFiles did not return a result for clientID ${clientID}`);
            }
            return files.data;
        };
        // admin-gated
        this.createFile = async (clientID, userID, input) => {
            const { data: file, error: addFileErr } = await slashauth_client_1.slashauthClient.file.addFile({
                file: input.file.buffer,
                mimeType: input.file.mimetype,
                userID,
                name: input.name,
                rolesRequired: input.rolesRequired,
                description: input.description,
            });
            if (addFileErr) {
                console.error(addFileErr);
                throw addFileErr;
            }
            if (!file) {
                throw new Error(`createFile did not return a result for clientID ${clientID} and userID ${userID}`);
            }
            return file;
        };
        this.updateFile = async (clientID, fileID, input) => {
            const { data: file, error: updateFileErr } = await slashauth_client_1.slashauthClient.file.updateFile({
                id: fileID,
                name: input.name,
                description: input.description,
                rolesRequired: input.rolesRequired,
            });
            if (updateFileErr) {
                console.error(updateFileErr);
                throw updateFileErr;
            }
            if (!file) {
                throw new Error(`updateFile did not return a result for clientID ${clientID}`);
            }
            return file;
        };
        this.deleteFile = async (clientID, fileID) => {
            const { data: file, error: deleteFileErr } = await slashauth_client_1.slashauthClient.file.deleteFile({
                id: fileID,
            });
            if (deleteFileErr) {
                console.error(deleteFileErr);
                throw deleteFileErr;
            }
            if (!file) {
                throw new Error(`deleteFile did not return a result for clientID ${clientID}`);
            }
            return file;
        };
    }
}
exports.FileController = FileController;
//# sourceMappingURL=file.js.map