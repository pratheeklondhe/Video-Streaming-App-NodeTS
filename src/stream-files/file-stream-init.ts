import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import { mongoURI, genreVideoDBcollectionName, Mongo, mongooseConnection } from '../config/appconfig';
import Grid from 'gridfs-stream';

const storage = new GridFsStorage({
    url: mongoURI,
    file: (_req, file) => {
        return new Promise((resolve, _reject) => {
            const fileInfo = {
                filename: file.originalname,
                bucketName: genreVideoDBcollectionName
            };
            resolve(fileInfo);
        })
    }
});

export function createGridStream(mongooseConnectn = mongooseConnection.db, mongo = Mongo.mongo): Grid.Grid {
    return Grid(mongooseConnectn, Mongo.mongo);
}


export const upload = multer({ storage });
