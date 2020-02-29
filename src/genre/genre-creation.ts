import express from 'express';
import { genreSchema } from './joi_schema/genre-creation';
import _ from 'lodash';
import { Genre, genreModel } from './models/genre-model';
import { errBuilder } from '../custom-utilities/error-service';
import { authenticateAdmin } from '../middleware/auth-token';
import { upload } from '../stream-files/file-stream-init';


let router = express.Router();

router.post('/addgenre', authenticateAdmin, (req: express.Request, res: express.Response) => {
    const joiRes = genreSchema.validate(req.body);
    if (joiRes.error) throw joiRes?.error?.details[0]?.message;
    saveGenreDetails(req.body, res);
});

router.post('/uploadgenre',
    // authenticateAdmin,
    upload.single('genrevideo'), (req: express.Request, res: express.Response) => {
        try {
            console.log(req?.file);
            res.status(200).send({ success: true, message: 'Uploaded Successfully' });
        } catch (e) {
            res.status(400).send(errBuilder('Error while Uploading', 'GenreUploadError'));
        }
        
    });

async function saveGenreDetails(genre: Genre, res: express.Response) {
    try {
        try {
            const model: any = new genreModel(genre);
            model.validateRequirements();
            const k = await model.save();
            res.status(200).send(k);
        } catch (e) {
            throw e;
        }
    } catch (e) {
        // const err = e?.message || 'Could not save Genre. Try again';
        res.status(400).send(errBuilder(e?.message, 'GenreError'));
    }
}

export { router as genreRouter };