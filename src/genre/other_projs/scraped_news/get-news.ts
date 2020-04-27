import express, { Request, Response } from 'express';
import http from 'http';
let router = express.Router();


router.get('/get-data', (req: Request, res: Response) => {
  const options = {
    host: 'www.google.com',
    path: '/index.html'
    };
    getData(options);
});

function getData(options: any) {
    http.get(options, (res) => {
        console.log(res);
        // res.
    });
}