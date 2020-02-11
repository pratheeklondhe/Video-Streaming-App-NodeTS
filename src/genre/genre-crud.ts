import express, { Request, Response } from 'express';
import { genreModel, Genre } from './models/genre-model';
import { Categories } from './entity/genre-categories';
import { errBuilder } from '../custom-utilities/error-service';
import { authenticateUser } from '../middleware/auth-token';


const router = express.Router();

router.get('/getinitial', authenticateUser, async (req: Request, res: Response) => {
    try{
        res.status(200).send(await generateResponse());
    } catch (e) {
        res.status(404).send(errBuilder(e?.message, 'GenreError'));
    }
});

/**
 * Requires genreid to be passed as query param
 */
router.get('/getgenre', authenticateUser, async (req: Request, res: Response) => {
    try{
        if(!req.query.genreid) throw new Error('Invalid Genre'); 
        const genre = await genreModel.findOne({ genreId: req?.query?.genreid });
        if (genre) res.status(200).send(genre);
        else throw new Error('Invalid Genre');
    } catch (e) {
        res.status(404).send(errBuilder(e?.message, 'GenreError'));
    }
});

/**
 * Requires category, skip and limit to be passed as query param
 */
router.get('/getgenreofcategory', authenticateUser, async (req: Request, res: Response) => {
    try{
        if((!req.query.category) ||
        (!req.query.skip) ||
        (!req.query.limit || Number(req.query.limit) > 10) || (!req.query.genreId))
        throw new Error('Invalid Category');
        const genres = await genreModel.find({
            category: { $in: [req.query.category] }, 
            genreId: { $ne: req.query.genreId } }
            ).limit(2);
        if (genres) res.status(200).send(genres);
        else throw new Error('Invalid Category');
    } catch(e) {
        res.status(404).send(errBuilder(e?.message, 'GenreError'));
    }
});

async function generateResponse() {
    try{
        const categyValues = Object.values(Categories);
        const categyKeys = Object.keys(Categories);
        const obj: any = {};
        const responseProperties = ['genreId', 'screenshots',
                             'displayImg', 'title', 'description', 'category'];
        for(let i=0; i< categyKeys?.length; i++) {
            const query = { category: { $in: [categyValues[i]] } };
            obj[categyKeys[i]] = await genreModel.find(query, responseProperties);
        }
        return obj;
    } catch(e) {
        throw e;
    }
}

export { router as genreCrudRouter }; 