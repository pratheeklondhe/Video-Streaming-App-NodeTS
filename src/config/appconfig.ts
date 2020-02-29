import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
export const genreVideoDBcollectionName = 'genreVideo';
export const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/local_sample';
const env = process.env.NODE_ENV || 'development';
let mongooseConnection: any;

const app = express();

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
            await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
            mongooseConnection = mongoose.connection
            return `Mongoose Connected to ${mongoURI}`;
        } catch(e) {
            throw new Error(`Could not Connect to ${mongoURI}`);
        }
    }
};

export {App, app, mongoose as Mongo, mongooseConnection};
