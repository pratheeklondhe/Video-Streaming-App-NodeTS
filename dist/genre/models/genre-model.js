"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appconfig_1 = require("../../config/appconfig");
const genre_language_1 = require("../entity/genre-language");
const genre_categories_1 = require("../entity/genre-categories");
exports.genreSchema = new appconfig_1.Mongo.Schema({
    genreId: { type: String, minlength: 3, required: true, unique: true },
    title: { type: String, minlength: 3, required: true },
    description: { type: String, minlength: 10, required: true },
    language: { type: String, enum: [...Object.values(genre_language_1.Languages)], minlength: 2, required: true },
    category: { type: [String], enum: [...Object.values(genre_categories_1.Categories)], required: true },
    year: String,
    displayImg: String,
    screenshots: { type: [String] },
    isSeries: { type: Boolean, default: false, required: true },
    cast: String,
    crew: String,
    seriesId: { type: String },
    seasonNo: { type: Number },
    episodeNo: { type: Number }
});
exports.genreSchema.methods.validateRequirements = function () {
    console.log(`Tiggered ${this.isSeries} ${this.seriesId} ${this.seasonNo}`);
    if (this.isSeries) {
        if (this.seriesId == null || this.seriesId == undefined) {
            throw new Error('Series Id is required');
        }
        if (this.seasonNo == null || this.seasonNo == undefined) {
            throw new Error('Season Number is required');
        }
        if (this.episodeNo == null || this.episodeNo == undefined) {
            throw new Error('Episode Number is required');
        }
    }
};
exports.genreModel = appconfig_1.Mongo.model('vsnodeapp_genre', exports.genreSchema, 'vsnodeapp_genre');
//# sourceMappingURL=genre-model.js.map