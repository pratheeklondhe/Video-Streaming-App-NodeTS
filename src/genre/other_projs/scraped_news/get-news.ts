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
    http.get(options, (res) => {
        console.log(res);
        
    });
}

export {router as getScrapedNewsRouter};