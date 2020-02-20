"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const user_reg_schema = joi_1.default.object({
    userName: joi_1.default.string().min(2).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().alphanum().min(2).max(30).required()
});
exports.userRegSchema = user_reg_schema;
const user_login_schema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().alphanum().required()
});
exports.userLoginSchema = user_login_schema;
//# sourceMappingURL=user-registration.js.map