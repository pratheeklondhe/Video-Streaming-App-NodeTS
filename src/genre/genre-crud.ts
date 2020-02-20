import express, { Request, Response } from 'express';
import { genreModel, Genre } from './models/genre-model';
import { Categories } from './entity/genre-categories';
import { errBuilder } from '../custom-utilities/error-service';
import { authenticateUser, authenticateUserAsString } from '../middleware/auth-token';
import fs from 'fs';
import { genreStaticFilesModel, GenreStaticFiles } from './models/genre-static-files-model';


const router = express.Router();

router.get('/getinitial', authenticateUser, async (req: Request, res: Response) => {
    try {
        res.status(200).send(await generateResponse());
    } catch (e) {
        res.status(404).send(errBuilder(e ?.message, 'GenreError'));
    }
});

/**
 * Requires genreid to be passed as query param
 */
router.get('/getgenre', authenticateUser, async (req: Request, res: Response) => {
    try {
        if (!req.query.genreid) throw new Error('Invalid Genre');
        const genre = await genreModel.findOne({ genreId: req ?.query ?.genreid });
        if (genre) res.status(200).send(genre);
        else throw new Error('Invalid Genre');
    } catch (e) {
        res.status(404).send(errBuilder(e ?.message, 'GenreError'));
    }
});

/**
 * Requires category, skip and limit to be passed as query param
 */
router.get('/getgenreofcategory', authenticateUser, async (req: Request, res: Response) => {
    try {
        if ((!req.query.category) ||
            (!req.query.skip) ||
            (!req.query.limit || Number(req.query.limit) > 10) || (!req.query.genreId))
            throw new Error('Invalid Category');
        const genres = await genreModel.find({
            category: { $in: [req.query.category] },
            genreId: { $ne: req.query.genreId }
        }
        ).limit(2);
        if (genres) res.status(200).send(genres);
        else throw new Error('Invalid Category');
    } catch (e) {
        res.status(404).send(errBuilder(e.message, 'GenreError'));
    }
});

/**
 * Requires genreid and token, as path params to stream video
 */
router.get('/stream/:genreid/:token', async (req: Request, res: Response) => {
    try {
        authenticateUserAsString(req.params.token);
        await findAndRenderGenre(req, res);
    } catch (e) {
        res.status(404).send(errBuilder(e ?.message, 'GenreError'));
    }
});



async function findAndRenderGenre(req: Request, res: Response) {
    try{
    const genreStaticFiles = <GenreStaticFiles><unknown>await genreStaticFilesModel.findOne({ genreId: req.params.genreid });
    if (genreStaticFiles && genreStaticFiles.genreFileUrl) {
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        console.log(__dirname + '/../../assets/file_example_MP4_1920_18MG.mp4');
        const rs = fs.createReadStream(__dirname + '/../../assets/file_example_MP4_1920_18MG.mp4');
        rs.pipe(res);
    }
    else {
        throw new Error(`Genre-${req.params.genreid} Not Available`);
    }
    } catch(e) {
        console.log(e);
    }
}

async function generateResponse() {
    try {
        const categyValues = Object.values(Categories);
        const categyKeys = Object.keys(Categories);
        const obj: any = {};
        const responseProperties = ['genreId', 'screenshots',
            'displayImg', 'title', 'description', 'category'];
        for (let i = 0; i < categyKeys.length; i++) {
            const query = { category: { $in: [categyValues[i]] } };
            obj[categyKeys[i]] = await genreModel.find(query, responseProperties);
        }
        return obj;
    } catch (e) {
        throw e;
    }
}

export { router as genreCrudRouter }; 