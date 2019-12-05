import {App ,app} from './config/appconfig';
import { logger } from './middleware/logger';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';

import { userCreationRouter }  from './user-creation/user-creation';
import { userAuthenticationRouter } from './authenticate/user-authentication';

app.use(bodyParser.json());
app.use(logger);
app.use('/api/usercreation' , userCreationRouter);
app.use('/api/userauthentication' , userAuthenticationRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Hello World`);
});



App.mongoConnect()
    .then((data: string) => {
        App.start();
        console.log(data);
    })
    .catch((err: Error) => console.error(err.message));

