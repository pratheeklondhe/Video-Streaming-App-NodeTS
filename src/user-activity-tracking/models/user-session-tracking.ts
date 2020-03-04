import { Mongo } from "../../config/appconfig";

export class GenreWatchDetails{
    // genreId: String | undefined;
    // watchTime: Date | undefined;

    constructor(public genreId: String, public watchTime: Date) {
        this.genreId = genreId;
        this.watchTime = watchTime;
    }
}

export const userDetailsSchema = new Mongo.Schema({
    userName: { type: String, minlength: 5, maxlength: 30, required: true },
    email: { type: String, minlength: 3, maxlength: 30, required: true, unique: true },
    aboutPageVisitCount: { type: Number, default: 0, required: true },
    portFolioVisitCount: { type: Number, default: 0, required: true },
    loginDateTime: { type: [Date] },
    genreWatchedDetails: { type: [GenreWatchDetails] }
});

export const userDetailsModel = Mongo.model('vsnodeapp_user_details', userDetailsSchema, 'vsnodeapp_user_details');

export class UserDetailsClass {
    userName: String | undefined;
    email: String | undefined;
    aboutPageVisitCount: Number | undefined;
    portFolioVisitCount: Number | undefined;
}

