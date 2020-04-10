import { Request, Response } from 'express';
import { createGridStream } from './file-stream-init';
import { genreVideoDBcollectionName } from '../config/appconfig';

export async function streamGenre(req: Request, res: Response, filename: string) {
    try {
        const gfs = createGridStream();
        gfs.collection(genreVideoDBcollectionName);

        ifFileExist(filename, gfs, res);

    } catch (e) {
        throw new Error(`Error streaming ${filename}`);
    }
}

function ifFileExist(filename: string, gfs: any, res: Response) {
    try {
        gfs.files.find({ filename })
            .toArray((err: any, file: any) => {
                console.log(file);
                if (file && file.length) {
                    renderGenre(gfs, filename, res);
                } else {
                    throw new Error();
                }
            });
    } catch (e) {
        throw new Error();
    }
}

function renderGenre(gfs: any, filename: string, res: Response) {
    try {
        const readstream = gfs.createReadStream({
            filename: filename
        });
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        readstream.pipe(res);
    } catch (e) {
        throw new Error();
    }
}