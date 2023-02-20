"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@slashauth/express");
const express_2 = __importDefault(require("express"));
const app_1 = require("../routes/app");
const event_1 = require("../routes/event");
const health_check_1 = require("../routes/health_check");
const user_1 = require("../routes/user");
const slashauth_client_1 = require("../third-party/slashauth_client");
const constants_1 = require("../utils/constants");
const routes_1 = require("../utils/routes");
const multer_1 = __importDefault(require("multer"));
const file_1 = require("../routes/file");
exports.default = (app) => {
    const cors = require('cors')({ origin: true });
    const middleware = new express_1.SlashauthMiddlewareExpress(slashauth_client_1.slashauthClient);
    const file = (0, multer_1.default)();
    app.use(cors);
    app.use(express_2.default.json());
    // Middleware to parse the slashauth token
    app.use(middleware.parseAuthToken());
    app.get('/', (0, routes_1.wrapAsync)(health_check_1.healthCheck));
    app.get('/metadata', (0, routes_1.wrapAsync)(app_1.getAppMetadata));
    // Middleware to check roles
    app.get('/events', middleware.hasRole(constants_1.CONSTANTS.MEMBER_ROLE_LEVEL), (0, routes_1.wrapAsync)(event_1.getEvents));
    app.get('/users', middleware.hasRole(constants_1.CONSTANTS.ADMIN_ROLE_LEVEL), (0, routes_1.wrapAsync)(user_1.getUsers));
    app.get('/me', (0, routes_1.wrapAsync)(user_1.getMe));
    app.patch('/me', (0, routes_1.wrapAsync)(user_1.patchMe));
    app.post('/events', middleware.hasRole(constants_1.CONSTANTS.ADMIN_ROLE_LEVEL), (0, routes_1.wrapAsync)(event_1.addEvent));
    // FILES
    app.get('/files', middleware.hasRole(constants_1.CONSTANTS.MEMBER_ROLE_LEVEL), (0, routes_1.wrapAsync)(file_1.listFiles));
    app.get('/files/:fileID/url', middleware.hasRole(constants_1.CONSTANTS.MEMBER_ROLE_LEVEL), (0, routes_1.wrapAsync)(file_1.getPresignedURLForFile));
    // multer works as a middleware for multipart-uploads and appends it to the request (req.file)
    // file.single("file") says multer is expecting a single file with the key "file"
    app.post('/files', [middleware.hasRole(constants_1.CONSTANTS.ADMIN_ROLE_LEVEL), file.single('file')], (0, routes_1.wrapAsync)(file_1.createFile));
    app.patch('/files/:fileID', middleware.hasRole(constants_1.CONSTANTS.ADMIN_ROLE_LEVEL), (0, routes_1.wrapAsync)(file_1.updateFile));
    app.delete('/files/:fileID', middleware.hasRole(constants_1.CONSTANTS.ADMIN_ROLE_LEVEL), (0, routes_1.wrapAsync)(file_1.deleteFile));
};
//# sourceMappingURL=rest.js.map