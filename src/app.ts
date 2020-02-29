import { App, app, genreVideoDBcollectionName } from './config/appconfig';
import { logger } from './middleware/logger';
import bodyParser from 'body-parser';
import { setCors } from './middleware/CORS';
import { genreModel } from './genre/models/genre-model';
import { initializeRouters } from './custom-utilities/router-initialize';
import { upload, createGridStream } from './stream-files/file-stream-init';

app.use(bodyParser.json());
app.use(setCors);
app.use(logger);
initializeRouters(app);



app.post('/genre', (req) => {
    try {
        (new genreModel(req.body) as any).validateRequirements();
        console.log(req.body);
        new genreModel(req.body).save();
    } catch (e) {
        throw e;
    }
});

app.post('/', upload.single('cust'), (req, res) => {
    console.log(req.file);
    res.status(200).send('WOW, Iam up and running an Updated');
});

app.get('/', (req, res) => {
    const gfs = createGridStream();
    gfs.collection(genreVideoDBcollectionName);
    const readstream = gfs.createReadStream({
        filename: '1e61d095d4bf409ba6a67b70ae0cbbce.mp4'
    });
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    readstream.pipe(res);
});


App.mongoConnect()
    .then((data: string) => {
        App.start();
        console.log(data);
    })
    .catch((err: Error) => console.error(err.message));

