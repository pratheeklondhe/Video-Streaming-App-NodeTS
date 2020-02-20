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
const genre_model_1 = require("./models/genre-model");
const genre_categories_1 = require("./entity/genre-categories");
const error_service_1 = require("../custom-utilities/error-service");
const auth_token_1 = require("../middleware/auth-token");
const fs_1 = __importDefault(require("fs"));
const genre_static_files_model_1 = require("./models/genre-static-files-model");
const router = express_1.default.Router();
exports.genreCrudRouter = router;
router.get('/getinitial', auth_token_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.status(200).send(yield generateResponse());
    }
    catch (e) {
        res.status(404).send(error_service_1.errBuilder((_a = e) === null || _a === void 0 ? void 0 : _a.message, 'GenreError'));
    }
}));
/**
 * Requires genreid to be passed as query param
 */
router.get('/getgenre', auth_token_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        if (!req.query.genreid)
            throw new Error('Invalid Genre');
        const genre = yield genre_model_1.genreModel.findOne({ genreId: (_c = (_b = req) === null || _b === void 0 ? void 0 : _b.query) === null || _c === void 0 ? void 0 : _c.genreid });
        if (genre)
            res.status(200).send(genre);
        else
            throw new Error('Invalid Genre');
    }
    catch (e) {
        res.status(404).send(error_service_1.errBuilder((_d = e) === null || _d === void 0 ? void 0 : _d.message, 'GenreError'));
    }
}));
/**
 * Requires category, skip and limit to be passed as query param
 */
router.get('/getgenreofcategory', auth_token_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((!req.query.category) ||
            (!req.query.skip) ||
            (!req.query.limit || Number(req.query.limit) > 10) || (!req.query.genreId))
            throw new Error('Invalid Category');
        const genres = yield genre_model_1.genreModel.find({
            category: { $in: [req.query.category] },
            genreId: { $ne: req.query.genreId }
        }).limit(2);
        if (genres)
            res.status(200).send(genres);
        else
            throw new Error('Invalid Category');
    }
    catch (e) {
        res.status(404).send(error_service_1.errBuilder(e.message, 'GenreError'));
    }
}));
/**
 * Requires genreid and token, as path params to stream video
 */
router.get('/stream/:genreid/:token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        auth_token_1.authenticateUserAsString(req.params.token);
        yield findAndRenderGenre(req, res);
    }
    catch (e) {
        res.status(404).send(error_service_1.errBuilder((_e = e) === null || _e === void 0 ? void 0 : _e.message, 'GenreError'));
    }
}));
function findAndRenderGenre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const genreStaticFiles = yield genre_static_files_model_1.genreStaticFilesModel.findOne({ genreId: req.params.genreid });
        if (genreStaticFiles && genreStaticFiles.genreFileUrl) {
            res.writeHead(200, { 'Content-Type': 'video/mp4' });
            const rs = fs_1.default.createReadStream(genreStaticFiles.genreFileUrl.toString());
            rs.pipe(res);
        }
        else {
            throw new Error(`Genre-${req.params.genreid} Not Available`);
        }
    });
}
function generateResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categyValues = Object.values(genre_categories_1.Categories);
            const categyKeys = Object.keys(genre_categories_1.Categories);
            const obj = {};
            const responseProperties = ['genreId', 'screenshots',
                'displayImg', 'title', 'description', 'category'];
            for (let i = 0; i < categyKeys.length; i++) {
                const query = { category: { $in: [categyValues[i]] } };
                obj[categyKeys[i]] = yield genre_model_1.genreModel.find(query, responseProperties);
            }
            return obj;
        }
        catch (e) {
            throw e;
        }
    });
}
//# sourceMappingURL=genre-crud.js.map