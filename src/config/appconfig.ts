import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

const app = express();
const env = process.env.NODE_ENV || 'development';
const mongodb = process.env.NODE_MONGO || 'mongodb://localhost/local_sample';

let App = {
    port: process.env.PORT || 3000,
    root: path,
    env: env,
    start() {
        if(1) {
            app.listen(this.port , () => {
                console.log(`Running Netflix on port ${this.port} in ${this.env} mode`);
            });
        }
    },
    async mongoConnect() {
        try{
            await mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
            return `Mongoose Connected to ${mongodb}`;
        } catch(e) {
            throw new Error(`Could not Connect to ${mongodb}`);
        }
    }
};

export {App, app, mongoose as Mongo};
