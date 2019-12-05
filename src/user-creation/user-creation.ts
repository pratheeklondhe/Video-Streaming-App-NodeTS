import express, { Request, Response } from 'express';
import { userRegSchema } from './joi_schema/user-registration';
import { userModel } from './models/user-model';
import _ from 'lodash';
import bcrypt from 'bcrypt';

let router = express.Router();

router.post('/register' , (req: Request, res: Response) => {
    const joiRes = userRegSchema.validate(req.body);
    if (joiRes.error) throw joiRes.error.details[0].message;
    saveUserDetails(_.pick(req.body, ['userName', 'email', 'password']), res);    
});

async function saveUserDetails(obj:any, res:Response){
    try{
        obj.password = await bcrypt.hash(obj.password, await bcrypt.genSalt(10));
    } catch (e){
        throw new Error(`Something went wrong.Try again.`);
    }
    try{
        await new userModel(obj).save();
        res.status(200).send(_.pick(obj, ['userName', 'email']));
    } catch (e) {
        throw e.message;
    }
}

export {router as userCreationRouter};