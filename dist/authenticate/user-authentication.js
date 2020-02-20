"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../user-creation/models/user-model");
const user_registration_1 = require("../user-creation/joi_schema/user-registration");
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_service_1 = require("../custom-utilities/error-service");
let router = express_1.default.Router();
exports.userAuthenticationRouter = router;
router.post('/auth', (req, res) => {
    const joiRes = user_registration_1.userLoginSchema.validate(req.body);
    if (joiRes.error)
        throw joiRes.error.details[0].message;
    validateUser(req, res);
});
function validateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield user_model_1.userModel.findOne({ email: req.body.email }).select('password').select('userName').select('_id').select('role').exec();
            const hashPasswrd = data ? data.password : '';
            const _id = data ? data._id : '';
            const role = data.role;
            if (yield bcrypt_1.default.compare(req.body.password, hashPasswrd)) {
                let responseHeader = new user_model_1.ResponseHeader(req.body.email, _id, role);
                const token = new user_model_1.userModel().generateAuthToken(responseHeader);
                const userName = data.userName;
                res.header('x-auth-token', token).status(200).send({ name: userName, message: 'User Validated Successfully' });
            }
            else {
                throw new Error('Check Username and Password1');
            }
        }
        catch (e) {
            res.status(400).send(error_service_1.errBuilder(e.message, 'AuthException'));
        }
    });
}
//# sourceMappingURL=user-authentication.js.map