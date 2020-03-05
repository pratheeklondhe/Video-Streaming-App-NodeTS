import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../user-creation/models/user-model';
import { errBuilder } from "../custom-utilities/error-service";
import { Roles } from "../user-creation/entity/roles";

export function authenticateUser(req: customRequest, res: any, next: any) {
    try {
        const decodedToken = authenticateToken(req, res);
        if (decodedToken ?.role ?.toString() !== Roles.USER) throw new Error('Invalid User');
        else next();
    } catch (e) {
        res.status(500).send(errBuilder(e ?.message, 'AuthError'))
    }
}

export function returnEmailFromToken(req: customRequest, res: any) {
        const decodedToken = authenticateToken(req, res);
        return decodedToken ?.email;
}

export function authenticateAdmin(req: customRequest, res: any, next: any) {
    try {
        const decodedToken = authenticateToken(req, res);
        if (decodedToken ?.role ?.toString() !== Roles.ADMIN) throw new Error('Invalid User');
        else next();
    } catch (e) {
        res.status(500).send(errBuilder(e ?.message, 'AuthError'))
    }
}

function authenticateToken(req: customRequest, res: any): token | undefined {
    const token = req.header('x-auth-token');
    if (!token) { res.status(400).send(errBuilder(`No Token Provided`)); }
    else {
        try {
            return <token>jwt.verify(token, PRIVATE_KEY);
        } catch (e) {
            res.status(500).send(errBuilder(`Invalid Token`, 'JsonWebTokenError'));
        }
    }
}

export function authenticateUserAsString(token: string): boolean {
    try {
        const decodedToken = authenticateTokenAsString(token);
        if (decodedToken ?.role ?.toString() !== Roles.USER) throw new Error('Invalid User');
        else return true;
    } catch (e) {
        throw e;
    }
}

export function authenticateTokenAsString(token: string) {
    try {
        return <token>jwt.verify(token, PRIVATE_KEY);
    } catch (e) {
        throw e;
    }
}


interface customRequest extends Request {
    user: customUser;
}

class customUser {
    _id!: string;
    email!: string;
}

interface token {
    id: String;
    email: String;
    role: Roles;
    iat: String;
}
