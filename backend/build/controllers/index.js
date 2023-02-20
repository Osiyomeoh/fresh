"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const app_1 = require("./app");
const event_1 = require("./event");
const file_1 = require("./file");
const user_1 = require("./user");
const CreateControllers = () => {
    const cont = {
        app: new app_1.AppController(),
        event: new event_1.EventController(),
        file: new file_1.FileController(),
        user: new user_1.UserController(),
    };
    return cont;
};
exports.controllers = CreateControllers();
//# sourceMappingURL=index.js.map