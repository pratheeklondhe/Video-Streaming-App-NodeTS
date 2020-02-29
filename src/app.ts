import { App, app } from './config/appconfig';
import { logger } from './middleware/logger';
import bodyParser from 'body-parser';
import { setCors } from './middleware/CORS';
import { genreModel } from './genre/models/genre-model';
import { initializeRouters } from './custom-utilities/router-initialize';

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

// app.post('/', upload.single('cust'), (req, res) => {
//     console.log(req.file);
//     res.status(200).send('WOW, Iam up and running an Updated');
// });

App.mongoConnect()
    .then((data: string) => {
        App.start();
        console.log(data);
    })
    .catch((err: Error) => console.error(err.message));

