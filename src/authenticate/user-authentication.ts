import express, { Request, Response } from 'express';
import { userModel, userClass, ResponseHeader} from '../user-creation/models/user-model';
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
        const data = await userModel.findOne({email: req.body.email}).select('password').select('_id').exec();
        const hashPasswrd = data ? (<userClass><unknown>data).password : '';
        const _id = data ? (<userClass><unknown>data)._id : '';
        if(await bcrypt.compare(req.body.password, hashPasswrd)) {
            let responseHeader = new ResponseHeader(req.body.email, _id);
            const token = (new userModel() as any).generateAuthToken(responseHeader);
            res.header('x-auth-token', token).status(200).send('User Validated Successfully'); 
        }
        else { res.status(400).send(`Check Username and Password`) }
    } catch(e) {
        res.status(400).send(`Check Username and Password`)
    }
}

export {router as userAuthenticationRouter};