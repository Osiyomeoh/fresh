"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
const express_1 = __importDefault(require("express"));
const rest_1 = __importDefault(require("./servers/rest"));
require("./controllers/cache");
(async () => {
    await (0, init_1.init)();
    const app = (0, express_1.default)();
    (0, rest_1.default)(app);
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log('Listening on port', port);
    });
})();
//# sourceMappingURL=index.js.map