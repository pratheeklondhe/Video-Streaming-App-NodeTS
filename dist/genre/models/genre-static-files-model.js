"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appconfig_1 = require("../../config/appconfig");
exports.genreStaticFilesSchema = new appconfig_1.Mongo.Schema({
    genreId: { type: String, minlength: 3, required: true, unique: true },
    genreFileUrl: { type: String, required: true }
});
exports.genreStaticFilesModel = appconfig_1.Mongo.model('vsnodeapp_genre_static_files', exports.genreStaticFilesSchema, 'vsnodeapp_genre_static_files');
//# sourceMappingURL=genre-static-files-model.js.map