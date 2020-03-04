import express, { Request, Response } from 'express';
import { authenticateUser, returnEmailFromToken } from '../middleware/auth-token';
import { userDetailsModel, UserDetailsClass, GenreWatchDetails } from './models/user-session-tracking';
import { errBuilder } from '../custom-utilities/error-service';
import { filterUserDetails } from '../user-creation/user-creation';

const router = express.Router();

router.put('/visit', authenticateUser, async (req: Request, res: Response) => {
    try{
        const emailId = returnEmailFromToken(req as any, res);
        const find = { email: emailId };
        const update = { $inc : { aboutPageVisitCount: 1 } };
        const userDetail = await userDetailsModel.findOneAndUpdate(find, update);
        if (!userDetail) throw new Error();
        else res.status(200).send( {flag: 'Success'} );
    } catch (e) {
        res.status(400).send(errBuilder('Failure'));
    }
});

router.put('/portfolio', authenticateUser, async (req: Request, res: Response) => {
    try{
        const emailId = returnEmailFromToken(req as any, res);
        const find = { email: emailId };
        const update = { $inc : { portFolioVisitCount: 1 } };
        const userDetail = await userDetailsModel.findOneAndUpdate(find, update);
        if (!userDetail) throw new Error();
        else res.status(200).send( {flag: 'Success'} );
    } catch (e) {
        res.status(400).send(errBuilder('Failure'));
    }
});

router.put('/login', authenticateUser, async (req: Request, res: Response) => {
    try{
        const emailId = returnEmailFromToken(req as any, res);
        const find = { email: emailId };
        const update = { $push: {loginDateTime: new Date()} };
        const userDetail = await userDetailsModel.findOneAndUpdate(find, update);
        if (!userDetail) createUserDetail(emailId);
        else res.status(200).send({flag: 'Success'});
    } catch (e) {
        res.status(200).send({ flag: 'Failure' });
    }
});

router.put('/genrewatch', authenticateUser, async (req: Request, res: Response) => {
    try{
        const emailId = returnEmailFromToken(req as any, res);
        const find = { email: emailId };
        const genreWatchDtls = new GenreWatchDetails(req?.body?.genreId, new Date());
        const update = { $push: {genreWatchedDetails: genreWatchDtls} };
        const userDetail = await userDetailsModel.findOneAndUpdate(find, update);
        if (!userDetail) throw new Error();
        else res.status(200).send( {flag: 'Success'} );
    } catch (e) {
        res.status(200).send({ flag: 'Failure' })
    }
})



async function createUserDetail(emailId: String | undefined) {
    try {
        const newUserDetail = new UserDetailsClass();
        newUserDetail.email = emailId || '';
        let { userName } = await filterUserDetails(newUserDetail.email.toString(), 'userName');
        newUserDetail.userName = userName;
        await new userDetailsModel(newUserDetail).save();
    } catch (e) {
        throw new Error();
    }
}

// async function

export {router as aboutPageTrackingRouter}