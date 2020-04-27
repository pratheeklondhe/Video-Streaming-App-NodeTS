import express, { Request, Response } from 'express';
import http from 'http';
let router = express.Router();


router.get('/get-data/:url', (req: Request, res: Response) => {
  const options = {
    host: req?.params?.url,
    path: '/'
    };
    getData(options);
});

function getData(options: any) {
    console.log('========HERE IS URL=========');
    console.log(options.host);

    http.get(options, (res) => {
            console.log('========HERE IS RESPONSE=========');

        console.log(res);
            console.log('========HERE IS RESPONSE END=========');

        
    });
}

export {router as getScrapedNewsRouter};