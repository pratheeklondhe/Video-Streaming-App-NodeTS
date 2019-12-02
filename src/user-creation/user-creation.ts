import express, { Request, Response } from 'express';
import { userRegSchema } from './joi_schema/user-registration';
import { Mongo } from '../config/appconfig';
import { userModel } from './models/user-model';
let router = express.Router();

router.post('/register' , (req: Request, res: Response) => {
    const joiRes = userRegSchema.validate(req.body);
    if(joiRes.error) res.status(400).send(joiRes.error.details[0].message);
    new userModel(req.body).save()
        .then(data => res.status(200).send(`Saved the user successfully`))
        .catch(err => {
            // console.log(err);
            // throw err;
            res.status(400).send(err.message)
        });        
});

export {router as userCreationRouter};