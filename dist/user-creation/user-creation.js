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
const user_registration_1 = require("./joi_schema/user-registration");
const user_model_1 = require("./models/user-model");
const lodash_1 = __importDefault(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_token_1 = require("../middleware/auth-token");
const roles_1 = require("./entity/roles");
let router = express_1.default.Router();
exports.userCreationRouter = router;
router.post('/register', (req, res) => {
    var _a, _b, _c;
    const joiRes = user_registration_1.userRegSchema.validate(req.body);
    if (joiRes.error)
        throw (_c = (_b = (_a = joiRes) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.details[0]) === null || _c === void 0 ? void 0 : _c.message;
    saveUserDetails(lodash_1.default.pick(req.body, ['userName', 'email', 'password']), res);
});
router.post('/registersimple', auth_token_1.authenticateUser, (req, res) => {
    res.status(200).send('Success');
});
function saveUserDetails(obj, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            obj.devPass = obj.password;
            obj.role = roles_1.Roles.USER;
            obj.password = yield bcrypt_1.default.hash(obj.password, yield bcrypt_1.default.genSalt(10));
        }
        catch (e) {
            throw new Error(`Something went wrong.Try again.`);
        }
        try {
            yield new user_model_1.userModel(obj).save();
            res.status(200).send(lodash_1.default.pick(obj, ['userName', 'email']));
        }
        catch (e) {
            res.status(400).send(`Something went wrong.Try again.`);
        }
    });
}
//# sourceMappingURL=user-creation.js.map