"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger(req, res, next) {
    console.log(`Request made for url = ${req.url}`);
    next();
}
exports.logger = logger;
//# sourceMappingURL=logger.js.map