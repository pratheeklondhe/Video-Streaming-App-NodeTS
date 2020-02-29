
import { Mongo, mongooseConnection } from "../../config/appconfig";

export var genreStaticFilesSchema = new Mongo.Schema({
    genreId: { type: String, minlength: 3, required: true, unique: true },
    genreFileUrl: { type: String, required: true }
});

export var genreStaticFilesModel = Mongo.model('vsnodeapp_genre_static_files', genreStaticFilesSchema, 'vsnodeapp_genre_static_files');

export interface GenreStaticFiles {
    genreId: String | undefined;
    genreFileUrl: String | undefined;
}