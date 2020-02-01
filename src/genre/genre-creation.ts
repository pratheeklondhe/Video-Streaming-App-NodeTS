import express, { Request, Response } from 'express';
import { genreSchema } from './joi_schema/genre-creation';
import _ from 'lodash';
import { Genre, genreModel } from './models/genre-model';
import { errBuilder } from '../custom-utilities/error-service';
import { authenticateAdmin } from '../middleware/auth-token';


let router = express.Router();

router.post('/addgenre', authenticateAdmin, (req: Request, res: Response) => {
    const joiRes = genreSchema.validate(req.body);
    if (joiRes.error) throw joiRes?.error?.details[0]?.message;
    saveGenreDetails(req.body, res);
});

async function saveGenreDetails(genre: Genre, res: Response) {
    try{
        try{
            const model: any = new genreModel(genre);
            model.validateRequirements();
            const k = await model.save();
            res.status(200).send(k);
        } catch(e) {
            throw e;
        }
    }catch (e) {
        // const err = e?.message || 'Could not save Genre. Try again';
        res.status(400).send(errBuilder(e?.message, 'GenreError'));
    }
}

export { router as genreRouter };