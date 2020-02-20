"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user-creation/models/user-model");
const error_service_1 = require("../custom-utilities/error-service");
const roles_1 = require("../user-creation/entity/roles");
function authenticateUser(req, res, next) {
    var _a, _b, _c;
    try {
        const decodedToken = authenticateToken(req, res);
        if (((_b = (_a = decodedToken) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.toString()) !== roles_1.Roles.USER)
            throw new Error('Invalid User');
        else
            next();
    }
    catch (e) {
        res.status(500).send(error_service_1.errBuilder((_c = e) === null || _c === void 0 ? void 0 : _c.message, 'AuthError'));
    }
}
exports.authenticateUser = authenticateUser;
function authenticateAdmin(req, res, next) {
    var _a, _b, _c;
    try {
        const decodedToken = authenticateToken(req, res);
        if (((_b = (_a = decodedToken) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.toString()) !== roles_1.Roles.ADMIN)
            throw new Error('Invalid User');
        else
            next();
    }
    catch (e) {
        res.status(500).send(error_service_1.errBuilder((_c = e) === null || _c === void 0 ? void 0 : _c.message, 'AuthError'));
    }
}
exports.authenticateAdmin = authenticateAdmin;
function authenticateToken(req, res) {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(400).send(error_service_1.errBuilder(`No Token Provided`));
    }
    else {
        try {
            return jsonwebtoken_1.default.verify(token, user_model_1.PRIVATE_KEY);
        }
        catch (e) {
            res.status(500).send(error_service_1.errBuilder(`Invalid Token`, 'JsonWebTokenError'));
        }
    }
}
function authenticateUserAsString(token) {
    var _a, _b;
    try {
        const decodedToken = authenticateTokenAsString(token);
        if (((_b = (_a = decodedToken) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.toString()) !== roles_1.Roles.USER)
            throw new Error('Invalid User');
        else
            return true;
    }
    catch (e) {
        throw e;
    }
}
exports.authenticateUserAsString = authenticateUserAsString;
function authenticateTokenAsString(token) {
    try {
        return jsonwebtoken_1.default.verify(token, user_model_1.PRIVATE_KEY);
    }
    catch (e) {
        throw e;
    }
}
class customUser {
}
//# sourceMappingURL=auth-token.js.map