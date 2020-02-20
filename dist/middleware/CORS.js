"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setCors(req, res, next) {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', ['Content-Type', 'x-auth-token']);
    res.append("Access-Control-Expose-Headers", "x-auth-token");
    next();
}
exports.setCors = setCors;
//# sourceMappingURL=CORS.js.map