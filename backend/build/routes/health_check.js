"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = async (_, response) => {
    return response.status(200).json({ success: true });
};
exports.healthCheck = healthCheck;
//# sourceMappingURL=health_check.js.map