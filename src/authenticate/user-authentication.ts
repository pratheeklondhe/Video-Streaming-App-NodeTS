import express, { Request, Response } from 'express';
import { userModel, userClass } from '../user-creation/models/user-model';
import { userLoginSchema } from '../user-creation/joi_schema/user-registration';
import bcrypt from 'bcrypt';

let router = express.Router();

router.post('/auth', (req: Request, res: Response) => {
    const joiRes = userLoginSchema.validate(req.body);
    if (joiRes.error) throw joiRes.error.details[0].message;
    validateUser(req, res);
});

async function validateUser(req: Request, res: Response) {
    try {
        const data = await userModel.findOne({email: req.body.email}).select('password').exec();
        const hashPasswrd = data ? (<userClass><unknown>data).password : '';
        if(await bcrypt.compare(req.body.password, hashPasswrd)) { res.status(200).send(`Authenticated Successfully`) }
        else { res.status(400).send(`Check Username and Password`) }
    } catch(e) {
        console.log(`errrrrrr ${e}`);
    }
}

export {router as userAuthenticationRouter};