"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const genre_schema = joi_1.default.object({
    genreId: joi_1.default.string().min(3).required(),
    title: joi_1.default.string().min(3).required(),
    description: joi_1.default.string().min(10).required(),
    language: joi_1.default.string().min(2).required(),
    category: joi_1.default.array().required(),
    year: joi_1.default.string().required(),
    displayImg: joi_1.default.string().required(),
    screenshots: joi_1.default.array(),
    isSeries: joi_1.default.boolean().required(),
    cast: joi_1.default.string(),
    crew: joi_1.default.string(),
    seriesId: joi_1.default.string(),
    seasonNo: joi_1.default.number(),
    episodeNo: joi_1.default.number()
});
exports.genreSchema = genre_schema;
//# sourceMappingURL=genre-creation.js.map