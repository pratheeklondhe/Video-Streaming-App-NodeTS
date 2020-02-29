import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import { mongoURI, genreVideoDBcollectionName } from './../config/appconfig';

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req: any, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: file.originalname,
                bucketName: genreVideoDBcollectionName
            };
            resolve(fileInfo);
        })
    }
})

export const upload = multer({ storage });
