import express from 'express';
import path from 'path';
import mongoose from 'mongoose';


export const genreVideoDBcollectionName = 'genreVideo';
export const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/local_sample';
const env = process.env.NODE_ENV || 'development';
let mongooseConnection: mongoose.Connection;

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
            mongooseConnection = await mongoose.createConnection(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
            return `Mongoose Connected to ${mongoURI}`;
        } catch(e) {
            throw new Error(`Could not Connect to ${mongoURI}`);
        }
    }
};

export {App, app, mongoose as Mongo, mongooseConnection};
