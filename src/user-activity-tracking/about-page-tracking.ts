import express, { Request, Response } from 'express';
import { authenticateUser, returnEmailFromToken, authenticateTokenAsString } from '../middleware/auth-token';
import { userDetailsModel, UserDetailsClass, GenreWatchDetails } from './models/user-session-tracking';
import { errBuilder } from '../custom-utilities/error-service';
import { filterUserDetails } from '../user-creation/user-creation';
import { getTitleFromGenreId } from '../genre/genre-crud';

const router = express.Router();

router.put('/visit', authenticateUser, async (req: Request, res: Response) => {
    try {
        const emailId = returnEmailFromToken(req as any, res);
        const find = { email: emailId };
        const update = { $inc: { aboutPageVisitCount: 1 } };
        const userDetail = await userDetailsModel.findOneAndUpdate(find, update);
        if (!userDetail) throw new Error();
        else res.status(200).send({ flag: 'Success' });
    } catch (e) {
        res.status(400).send(errBuilder('Failure'));
    }
});

router.put('/portfolio', authenticateUser, async (req: Request, res: Response) => {
    try {
        const emailId = returnEmailFromToken(req as any, res);
        const find = { email: emailId };
        const update = { $inc: { portFolioVisitCount: 1 } };
        const userDetail = await userDetailsModel.findOneAndUpdate(find, update);
        if (!userDetail) throw new Error();
        else res.status(200).send({ flag: 'Success' });
    } catch (e) {
        res.status(400).send(errBuilder('Failure'));
    }
});

router.put('/login', authenticateUser, async (req: Request, res: Response) => {
    try {
        const emailId = returnEmailFromToken(req as any, res);
        const find = { email: emailId };
        const update = { $push: { loginDateTime: getISTString(new Date()) }, $inc: { loginCount: 1 } };
        const userDetail = await userDetailsModel.findOneAndUpdate(find, update);
        if (!userDetail) await createUserDetail(emailId, res);
        else res.status(200).send({ flag: 'Success' });
    } catch (e) {
        res.status(200).send({ flag: 'Failure' });
    }
});

function getISTString(date: Date) {
    const currentOffset = date.getTimezoneOffset();
    const ISTOffset = 330;   // IST offset UTC +5:30 
    return new Date(date.getTime() + (ISTOffset + currentOffset) * 60000).toString();
}

// router.put('/genrewatch', authenticateUser, async (req: Request, res: Response) => {
//     try{
//         const emailId = returnEmailFromToken(req as any, res);
//         const find = { email: emailId };
//         const genreWatchDtls = new GenreWatchDetails(req?.body?.genreId, getISTString(new Date()));
//         const update = { $push: {genreWatchedDetails: genreWatchDtls} };
//         const userDetail = await userDetailsModel.findOneAndUpdate(find, update);
//         if (!userDetail) throw new Error();
//         else res.status(200).send( {flag: 'Success'} );
//     } catch (e) {
//         res.status(200).send({ flag: 'Failure' })
//     }
// });

export async function genreWatchTracking(token: string, genreid: string) {
    try {
        console.log("Genre Watch Tracking");
        const { email } = authenticateTokenAsString(token);
        const find = { email };
        const title = await getTitleFromGenreId(genreid);
        const genreWatchDtls = new GenreWatchDetails(genreid, getISTString(new Date()), title);
        const update = { $push: {genreWatchedDetails: genreWatchDtls} };
        userDetailsModel.findOneAndUpdate(find, update).exec();
    } catch (e) {
        console.log(`Failed to update ${authenticateTokenAsString(token)?.email}'s
        watch history of Genre: ${genreid}`);
    }
}



async function createUserDetail(emailId: String | undefined, res: Response) {
    try {
        const newUserDetail = new UserDetailsClass();
        newUserDetail.email = emailId || '';
        let { userName } = await filterUserDetails(newUserDetail.email.toString(), 'userName');
        newUserDetail.userName = userName;
        newUserDetail.loginDateTime = [getISTString(new Date())];
        await new userDetailsModel(newUserDetail).save();
        res.status(200).send({ flag: 'Success' });
    } catch (e) {
        throw new Error();
    }
}

// async function

export { router as aboutPageTrackingRouter }