import {App ,app} from './config/appconfig';
import { logger } from './middleware/logger';
import bodyParser from 'body-parser';
import { userCreationRouter }  from './user-creation/user-creation';
import { Request, Response } from 'express';

app.use(bodyParser.json());
app.use(logger);
app.use('/api/usercreation' , userCreationRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Hello World`);
});



App.mongoConnect()
    .then((data: string) => {
        App.start();
        console.log(data);
    })
    .catch((err: Error) => console.error(err.message));

