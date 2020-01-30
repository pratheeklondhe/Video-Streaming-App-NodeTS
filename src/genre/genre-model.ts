import { Mongo } from "../config/appconfig";
import { Languages } from "./entity/genre-language";
import { Categories } from "./entity/genre-categories";

export var genreSchema = new Mongo.Schema({
    // genreId: { type: String, minlength: 3, required: true, unique: true },
    // title: { type: String, minlength: 3, required: true },
    // description: { type: String, minlength: 10, required: true},
    // language: { type: Languages, minlength: 2, required: true},
    // category: { type: [Categories], required: true },
    // year: { type: String, required: true },
    // displayImg: { type: String, required: true },
    // screenshots: { type: [String] },
    isSeries: { type: Boolean, default: false, required: true },
    // cast: { type: String, required: true },
    // crew: { type: String, required: true },
    seriesId: { type: String },
    seasonNo: { type: Number },
    episodeNo: { type: Number }
});

genreSchema.methods.validateRequirements = function() {
    console.log(`Tiggered ${this.isSeries} ${this.seriesId} ${this.seasonNo}`);
    if(this.isSeries) {
        if(this.seriesId == null || this.seriesId == undefined ) {
            throw 'Series Id is required';
        }
        if(this.seasonNo == null || this.seasonNo == undefined ) {
            throw 'Season Number is required';
        }
        if(this.episodeNo == null || this.episodeNo == undefined ) {
            throw 'Episode Number is required';
        }
    }
};

// genreSchema.vali

export let genreModel = Mongo.model('vsnodeapp_genre', genreSchema, 'vsnodeapp_genre');

