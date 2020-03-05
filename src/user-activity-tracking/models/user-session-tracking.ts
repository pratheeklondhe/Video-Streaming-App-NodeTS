import { Mongo } from "../../config/appconfig";

export class GenreWatchDetails{
    // genreId: String | undefined;
    // watchTime: Date | undefined;
    // title: String | undefined;

    constructor(public genreId: String, public watchDateTime: String,
        public title: String) {
        this.genreId = genreId;
        this.watchDateTime = watchDateTime;
        this.title = title;
    }
}

const GenreWatchDetailsSchema = new Mongo.Schema({ 
    genreId: String, 
    watchDateTime: String,
    title: String
});

export const userDetailsSchema = new Mongo.Schema({
    userName: { type: String, minlength: 5, maxlength: 30, required: true },
    email: { type: String, minlength: 3, maxlength: 30, required: true, unique: true },
    aboutPageVisitCount: { type: Number, default: 0, required: true },
    portFolioVisitCount: { type: Number, default: 0, required: true },
    loginDateTime: { type: [String] },
    loginCount: { type: Number, default: 1, required: true },
    genreWatchedDetails: { type: [GenreWatchDetailsSchema] }
});



export const userDetailsModel = Mongo.model('vsnodeapp_user_details', userDetailsSchema, 'vsnodeapp_user_details');

export class UserDetailsClass {
    userName: String | undefined;
    email: String | undefined;
    aboutPageVisitCount: Number | undefined;
    portFolioVisitCount: Number | undefined;
    loginDateTime: String[] = [];
    loginCount: Number | undefined;
    genreWatchedDetails: GenreWatchDetails | undefined;
}

