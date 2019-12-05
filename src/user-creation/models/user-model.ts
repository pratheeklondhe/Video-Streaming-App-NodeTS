import { Mongo } from "../../config/appconfig";

export const userModel = Mongo.model('vsnodeapp_user', new Mongo.Schema({
    userName: { type: String, minlength: 5, maxlength: 30, required: true },
    email: { type: String, minlength: 3, maxlength: 30, required: true, unique: true },
    password: { type: String, minlength: 3, required: true },
    accCreated: { type: Date, default: new Date() }
}), 'vsnodeapp_user');

export class userClass {
    userName!: string;
    email!: string;
    password!: string;
    accCreated!: string;
}