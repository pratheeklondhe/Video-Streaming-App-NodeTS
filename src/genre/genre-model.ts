import { Mongo } from "../config/appconfig";
import { Languages } from "./entity/genre-language";
import { Categories } from "./entity/genre-categories";

const s = new Mongo.Schema({
    genreId: { type: String, minlength: 3, required: true, unique: true },
    title: { type: String, minlength: 3, required: true },
    description: { type: String, minlength: 10, required: true},
    language: { type: Languages, minlength: 2, required: true},
    category: { type: [Categories], required: true },
    year: { type: String, required: true },
    displayImg: { type: String, required: true },
    screenshots: { type: [String] },
    isSeries: { type: Boolean, default: false, required: true },
    cast: { type: String, required: true },
    crew: { type: String, required: true },
    seriesId: { type: String, required: function() { return this.isSeries }},
    seasonNo: { type: Number, required: function() { return this.isSeries }},
    episodeNo: { type: Number, required: function() { return this.isSeries }}
})

