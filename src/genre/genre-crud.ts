import express, { Request, Response } from 'express';
import { genreModel, Genre, GenreFile } from './models/genre-model';
import { Categories } from './entity/genre-categories';
import { errBuilder } from '../custom-utilities/error-service';
import { authenticateUser, authenticateUserAsString, authenticateAdmin } from '../middleware/auth-token';
import { streamGenre } from '../stream-files/genre-stream';
import { createGridStream } from '../stream-files/file-stream-init';
import { genreWatchTracking } from '../user-activity-tracking/about-page-tracking';
import { GenreOrderModel, GenreOrder } from './models/genre-order-model';
import { genreVideoDBcollectionName } from '../config/appconfig';


const   router = express.Router();

router.get('/getinitial', authenticateUser, async (req: Request, res: Response) => {
    try {
        res.status(200).send(await generateResponse());
    } catch (e) {
        res.status(404).send(errBuilder(e?.message, 'GenreError'));
    }
});

/**
 * Requires genreid to be passed as query param
 */
router.get('/getgenre', authenticateUser, (req: Request, res: Response) => {
    try {
        getGenreByGenreId(req, res);
    } catch (e) {
        res.status(404).send(errBuilder(e?.message, 'GenreError'));
    }
});

router.get('/getgenrebygenreid', authenticateAdmin, (req: Request, res: Response) => {
    try {
        getGenreByGenreIdWithFileDetails(req, res);
    } catch (e) {
        res.status(404).send(errBuilder(e?.message, 'GenreError'));
    }
});

async function getGenreByGenreId(req: Request, res: Response) {
    if (!req.query.genreid) throw new Error('Invalid Genre');
    const genre = await genreModel.findOne({ genreId: req?.query?.genreid });
    if (genre) res.status(200).send(genre);
    else throw new Error('Invalid Genre');
}

async function getGenreByGenreIdWithFileDetails(req: Request, res: Response) {
    try {
        if (!req.query.genreid) throw new Error('Invalid Genre');
        let genre: GenreFile = await <GenreFile><unknown>
        genreModel.findOne({ genreId: req?.query?.genreid });
        // try {
            getGenreFileDetails(genre?.genreTitle?.toString(), genre, res);
        //     genre.filename = genreFile?.filename || '';
        //     genre.lengthInString = genreFile?.length || '0 Byte';
        // } catch (e) {
        //     genre.filename = '';
        //     genre.lengthInString = '0 Byte';
        // }
        // if (genre) res.status(200).send(genre);
        // else throw new Error('Invalid Genre');
    } catch (e) {
        throw new Error('Invalid Genre');
    }
}

function getGenreFileDetails(fileName: string, genre: GenreFile, res: Response) {
    try {
        const gfs = createGridStream();
        let genreTemp = genre;
        gfs.files.find({ filename: fileName})
            .toArray((err, file) => {
            if (err) throw new Error();
            if (file) {
                genreTemp.year = '';
                genreTemp['filename'] = 'Banro le';
                genreTemp.lengthInString = bytesToSize(file.length || 0);
                console.log(genreTemp);
                if (genreTemp) res.status(200).send(genreTemp);

            }
            // if (genreTemp) res.status(200).send(genreTemp);
            else res.status(200).send(genreTemp);
        });
    } catch (e) {
        throw new Error('Invalid Genre');
    }
}

function bytesToSize(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(Number((bytes / Math.pow(1024, i)).toFixed(2))) + ' ' + sizes[i];
}

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
        authenticateUserAsString(req?.params?.token);
        const genreTitle = await getGenreTitle(req, res);
        streamGenre(req, res, genreTitle);
        
        // 
        genreWatchTracking(req?.params?.token, req?.params?.genreid);
    } catch (e) {
        res.status(404).send(errBuilder(e?.message, 'GenreError'));
    }
});

router.get('/deletegenre/:fileName', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        console.log(req?.params?.fileName);
        if (!req?.params?.fileName) throw new Error(`File Name Not Provided`);
        const gfs = createGridStream();
        gfs.remove({filename: req?.params?.fileName, root: genreVideoDBcollectionName} , (err) => {
            if (err) throw new Error(`Error Deleting ${req?.params?.fileName}`);
            res.status(200).send({ flag: true, message: `SuccessFully Deleted ${req?.params?.fileName}.` })
        });
    } catch (e) {
        res.status(400).send(errBuilder(e?.message));
    }
});

router.post('/listgenreofcategory', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        const genreList = await genreModel.find({ category: { $in: req?.body?.selectedCategory } }
            , 'genreId category title');
        if (!genreList || !genreList.length) throw new Error();
        res.status(200).send(genreList);
    } catch (e) {
        res.status(400).send(errBuilder('Genre/s Unavailable', 'GenreError'));
    }
});

router.get('/getcategorylist', authenticateAdmin, (req: Request, res: Response) => {
    try {
        const catgryList = Object.values(Categories);
        res.status(200).send(catgryList);
    } catch (e) {
        res.status(400).send(errBuilder(e?.message, 'GenreError'));
    }
});

async function getGenreTitle(req: Request, res: Response): Promise<string> {
    try {
        const { genreTitle } = <Genre><unknown>await genreModel.
            findOne({ genreId: req?.params?.genreid }, 'genreTitle');
        console.log(genreTitle);
        if (!genreTitle) throw new Error(`Genre-${req?.params?.genreid} Not Available`);
        return genreTitle.toString();
    } catch (e) {
        throw new Error(`Genre-${req.params.genreid} Not Available`);
    }
}

// async function findAndRenderGenre(req: Request, res: Response) {
//     try{
//     const genreStaticFiles = <GenreStaticFiles><unknown>await genreStaticFilesModel.
//     findOne({ genreId: req.params.genreid }, 'filename');

//     if (genreStaticFiles && genreStaticFiles.genreFileUrl) {
//         res.writeHead(200, { 'Content-Type': 'video/mp4' });
//         console.log(__dirname + '/../../assets/videoplayback.mp4');
//         const rs = fs.createReadStream(__dirname + '/../../assets/videoplayback.mp4');
//         rs.pipe(res);
//     }
//     else {
//         throw new Error(`Genre-${req.params.genreid} Not Available`);
//     }
//     } catch(e) {
//         console.log(e);
//     }
// }

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
        const defaultOrder = [{key: 'TRENDING', value: 'Trending'}, {key: 'ADVENTURE', value: 'Adventure'}];
        const genreOrder: GenreOrder = <GenreOrder><unknown>await GenreOrderModel.findOne();
        console.log(genreOrder);
        obj.genreOrder = (genreOrder && genreOrder.genreOrder.length)? genreOrder.genreOrder : defaultOrder;
        return obj;
    } catch (e) {
        throw e;
    }
}

export async function getTitleFromGenreId(genreId: String) {
    try{
        const find = { genreId };
        const { title } = <Genre><unknown> await genreModel.findOne(find).select('title');
        if (!title) return '';
        else return title;
    } catch (e) {
        return '';
    }
}

export { router as genreCrudRouter }; 