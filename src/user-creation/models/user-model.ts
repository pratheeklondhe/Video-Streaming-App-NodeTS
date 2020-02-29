import { Mongo, mongooseConnection } from "../../config/appconfig";
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Roles } from "../entity/roles";

export const PRIVATE_KEY = 'thisisaprivatekey';
/**
 * This is the user Domain
 */
export let userSchema = new Mongo.Schema({
    userName: { type: String, minlength: 5, maxlength: 30, required: true },
    email: { type: String, minlength: 3, maxlength: 30, required: true, unique: true },
    password: { type: String, minlength: 3, required: true },
    devPass: { type: String },
    role: { type: String, required: true },
    accCreated: { type: Date, default: new Date() }
});

userSchema.methods.generateAuthToken = function (responseHeader: ResponseHeader, res: Response) {
    return jwt.sign(responseHeader, PRIVATE_KEY);
};
export let userModel = Mongo.model('vsnodeapp_user', userSchema, 'vsnodeapp_user');


export class ResponseHeader {
    constructor(public email: string, public id: string, public role: Roles) {
        this.email = email;
        this.id = id;
        this.role = role;
        return _.pick(this, ['id', 'email', 'role']);
    }
}

export class userClass {
    _id!: string;
    userName!: string;
    email!: string;
    password!: string;
    accCreated!: string;
    role!: Roles
}