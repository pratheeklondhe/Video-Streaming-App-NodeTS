import { Mongo } from "../../config/appconfig";
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const privateKey = 'thisisaprivatekey';

export let userSchema = new Mongo.Schema({
    userName: { type: String, minlength: 5, maxlength: 30, required: true },
    email: { type: String, minlength: 3, maxlength: 30, required: true, unique: true },
    password: { type: String, minlength: 3, required: true },
    accCreated: { type: Date, default: new Date() }
});

userSchema.methods.generateAuthToken = function (responseHeader: ResponseHeader, res: Response) {
    return jwt.sign(responseHeader, privateKey);
};
export let userModel = Mongo.model('vsnodeapp_user', userSchema, 'vsnodeapp_user');


export class ResponseHeader {
    id: string | undefined;
    email: string | undefined;

    constructor(email: string, id: string) {
        this.email = email;
        this.id = id;
        return _.pick(this, ['id', 'email']);
    }
}

export class userClass {
    _id!: string;
    userName!: string;
    email!: string;
    password!: string;
    accCreated!: string;
}