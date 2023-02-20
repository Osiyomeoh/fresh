"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const isEmpty = (str) => {
    return typeof str !== 'string' || !str || str.length === 0 || !str.trim();
};
exports.isEmpty = isEmpty;
//# sourceMappingURL=strings.js.map