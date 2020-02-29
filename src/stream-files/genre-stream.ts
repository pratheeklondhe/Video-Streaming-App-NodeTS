import { Request, Response } from 'express';
import { createGridStream } from './file-stream-init';
import { genreVideoDBcollectionName } from '../config/appconfig';

export function streamGenre(req: Request, res: Response, filename: string) {
    try {
        const gfs = createGridStream();
        gfs.collection(genreVideoDBcollectionName);
        const readstream = gfs.createReadStream({
            filename: filename
        });
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        readstream.pipe(res);
    } catch (e) {
        throw new Error(`Error streaming ${filename}`);
    }
}