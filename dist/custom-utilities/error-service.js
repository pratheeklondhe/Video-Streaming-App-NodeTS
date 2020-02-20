"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description A Error Builder Function
 * @param errorMessage message Property of error Object
 * @param errorClass error Property of error Object
 */
function errBuilder(errorMessage, errorClass) {
    return { error: errorClass || undefined, message: errorMessage };
}
exports.errBuilder = errBuilder;
//# sourceMappingURL=error-service.js.map