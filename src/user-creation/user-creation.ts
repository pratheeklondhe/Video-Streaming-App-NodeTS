import express, { Request, Response } from 'express';
import { userRegSchema } from './joi_schema/user-registration';
import { userModel, userClass } from './models/user-model';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { authenticateUser } from '../middleware/auth-token';
import { Roles } from './entity/roles';

let router = express.Router();

router.post('/register' , (req: Request, res: Response) => {
    const joiRes = userRegSchema.validate(req.body);
    if (joiRes.error) throw joiRes?.error?.details[0]?.message;
    saveUserDetails(_.pick(req.body, ['userName', 'email', 'password']), res);    
});

router.post('/registersimple', authenticateUser, (req: Request, res: Response) => {
    res.status(200).send('Success');
});

async function saveUserDetails(obj:any, res:Response){
    try{
        obj.devPass = obj.password;
        obj.role = Roles.USER;
        obj.password = await bcrypt.hash(obj.password, await bcrypt.genSalt(10));
    } catch (e){
        throw new Error(`Something went wrong.Try again.`);
    }
    try{
        await new userModel(obj).save();
        res.status(200).send(_.pick(obj, ['userName', 'email']));
    } catch (e) {
        res.status(400).send(`Something went wrong.Try again.`);
    }
}

export async function filterUserDetails(email: string, ...filterProps: string[]) {
    try{
        const filter = { email: email };
        const returnProps = filterProps.join(' ');
        return <userClass><unknown>await userModel.findOne(filter, returnProps);
    } catch (e) {
        throw new Error(`Error Occurred`);
    }
}

export {router as userCreationRouter};