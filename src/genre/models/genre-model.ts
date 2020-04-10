import { Mongo, mongooseConnection } from "../../config/appconfig";
import { Languages } from "../entity/genre-language";
import { Categories } from "../entity/genre-categories";

export var genreSchema = new Mongo.Schema({
    genreId: { type: String, minlength: 3, required: true, unique: true },
    title: { type: String, minlength: 3, required: true },
    genreTitle: { type: String, minlength: 3, required: true },
    description: { type: String, minlength: 10, required: true},
    language: { type: String, enum:[...Object.values(Languages)], minlength: 2, required: true},
    category: { type: [String], enum: [...Object.values(Categories)], required: true },
    year: String,
    displayImg: String,
    // show: { type: Boolean, default: true},
    screenshots: { type: [String] },
    isSeries: { type: Boolean, default: false, required: true },
    cast: String,
    crew: String,
    seriesId: { type: String },
    seasonNo: { type: Number },
    episodeNo: { type: Number }
});

genreSchema.methods.validateRequirements = function() {
    console.log(`Tiggered ${this.isSeries} ${this.seriesId} ${this.seasonNo}`);
    if(this.isSeries) {
        if(this.seriesId == null || this.seriesId == undefined ) {
            throw new Error('Series Id is required');
        }
        if(this.seasonNo == null || this.seasonNo == undefined ) {
            throw new Error('Season Number is required');
        }
        if(this.episodeNo == null || this.episodeNo == undefined ) {
            throw new Error('Episode Number is required');
        }
    }
};

export let genreModel = Mongo.model('vsnodeapp_genre', genreSchema, 'vsnodeapp_genre');

export interface Genre {
    genreId: String,
    title: String,
    genreTitle: String,
    description: String,
    language: Languages,
    category: [Categories],
    year: String,
    displayImg: String,
    screenshots: [String],
    isSeries: Boolean,
    cast: String,
    crew: String,
    seriesId: String,
    seasonNo: Number,
    episodeNo: Number
}

export interface GenreFile extends Genre {
    filename: String,
    length: number,
    lengthInString: String
}

