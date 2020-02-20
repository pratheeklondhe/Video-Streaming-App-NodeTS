"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appconfig_1 = require("../../config/appconfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
exports.PRIVATE_KEY = 'thisisaprivatekey';
/**
 * This is the user Domain
 */
exports.userSchema = new appconfig_1.Mongo.Schema({
    userName: { type: String, minlength: 5, maxlength: 30, required: true },
    email: { type: String, minlength: 3, maxlength: 30, required: true, unique: true },
    password: { type: String, minlength: 3, required: true },
    devPass: { type: String },
    role: { type: String, required: true },
    accCreated: { type: Date, default: new Date() }
});
exports.userSchema.methods.generateAuthToken = function (responseHeader, res) {
    return jsonwebtoken_1.default.sign(responseHeader, exports.PRIVATE_KEY);
};
exports.userModel = appconfig_1.Mongo.model('vsnodeapp_user', exports.userSchema, 'vsnodeapp_user');
class ResponseHeader {
    constructor(email, id, role) {
        this.email = email;
        this.id = id;
        this.role = role;
        this.email = email;
        this.id = id;
        this.role = role;
        return lodash_1.default.pick(this, ['id', 'email', 'role']);
    }
}
exports.ResponseHeader = ResponseHeader;
class userClass {
}
exports.userClass = userClass;
//# sourceMappingURL=user-model.js.map