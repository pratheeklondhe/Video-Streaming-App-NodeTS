import {App ,app} from './config/appconfig';
import { logger } from './middleware/logger';
import bodyParser from 'body-parser';
import { setCors } from './middleware/CORS';
import { Request, Response } from 'express';
import { errBuilder } from './custom-utilities/error-service';
import { genreModel } from './genre/models/genre-model';
import { initializeRouters } from './custom-utilities/router-initialize';

import fs  from 'fs';

app.use(bodyParser.json());
app.use(setCors);
app.use(logger);
initializeRouters(app);

app.get('/api/', (req: Request, res: Response) => {
    res.writeHead(200, {'Content-Type' : 'video/mp4'});
    const rs = fs.createReadStream('/home/pratheek/Desktop/Pratheek/Video-Streaming-App-NodeTS-master/assets/file_example_MP4_1920_18MG.mp4');
    rs.pipe(res);
    // res.status(400).send(errBuilder('dsgaf', 'Appconp'));
});

app.post('/genre' , (req) => {
    try{
        (new genreModel(req.body) as any).validateRequirements();
        console.log(req.body);
        new genreModel(req.body).save();
    } catch(e) {
        throw e;
    }
})



App.mongoConnect()
    .then((data: string) => {
        App.start();
        console.log(data);
    })
    .catch((err: Error) => console.error(err.message));

