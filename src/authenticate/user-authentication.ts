import express, { Request, Response } from 'express';
import { userModel, userClass, ResponseHeader} from '../user-creation/models/user-model';
import { userLoginSchema } from '../user-creation/joi_schema/user-registration';
import bcrypt from 'bcrypt';
import { errBuilder } from '../custom-utilities/error-service';
import { Roles } from '../user-creation/entity/roles';

let router = express.Router();

router.post('/auth', (req: Request, res: Response) => {
    const joiRes = userLoginSchema.validate(req.body);
    if (joiRes.error) throw joiRes.error.details[0].message;
    validateUser(req, res);
});

async function validateUser(req: Request, res: Response) {
    try {
        const data = await userModel.findOne({email: req.body.email}).select('password').select('userName').select('_id').select('role').exec();
        const hashPasswrd = data ? (<userClass><unknown>data).password : '';
        const _id = data ? (<userClass><unknown>data)._id : '';
        const role: Roles = (<userClass><unknown>data).role;

        if(await bcrypt.compare(req.body.password, hashPasswrd)) {
            let responseHeader = new ResponseHeader(req.body.email, _id, role);
            const token = (new userModel() as any).generateAuthToken(responseHeader);
            const userName = (<userClass><unknown>data).userName;
            res.header('x-auth-token', token).status(200).send({name: userName, message: 'User Validated Successfully', role: role.toUpperCase()}); 
        }
        else { 
            throw new Error('Check Username and Password1'); 
        }
    } catch(e) {
        res.status(400).send(errBuilder(e.message, 'AuthException'));
    }
}

export {router as userAuthenticationRouter};