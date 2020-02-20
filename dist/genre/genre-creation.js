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
const genre_creation_1 = require("./joi_schema/genre-creation");
const genre_model_1 = require("./models/genre-model");
const error_service_1 = require("../custom-utilities/error-service");
const auth_token_1 = require("../middleware/auth-token");
let router = express_1.default.Router();
exports.genreRouter = router;
router.post('/addgenre', auth_token_1.authenticateAdmin, (req, res) => {
    var _a, _b, _c;
    const joiRes = genre_creation_1.genreSchema.validate(req.body);
    if (joiRes.error)
        throw (_c = (_b = (_a = joiRes) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.details[0]) === null || _c === void 0 ? void 0 : _c.message;
    saveGenreDetails(req.body, res);
});
function saveGenreDetails(genre, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            try {
                const model = new genre_model_1.genreModel(genre);
                model.validateRequirements();
                const k = yield model.save();
                res.status(200).send(k);
            }
            catch (e) {
                throw e;
            }
        }
        catch (e) {
            // const err = e?.message || 'Could not save Genre. Try again';
            res.status(400).send(error_service_1.errBuilder((_a = e) === null || _a === void 0 ? void 0 : _a.message, 'GenreError'));
        }
    });
}
//# sourceMappingURL=genre-creation.js.map