import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { privateKey } from '../user-creation/models/user-model';

export function authenticateToken(req: customRequest, res: any, next: any) {
    const token = req.header('x-auth-token');
    if(!token) { res.status(400).send(`No Token Provided`) }
    else {
        console.log(jwt.verify(token, privateKey));
    }
    next();
}


interface customRequest extends Request {
    user: customUser; 
}

class customUser {
    _id!: string;
    email!: string;
}
