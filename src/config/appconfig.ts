import express from 'express';
import path from 'path';
const app = express();
const env = process.env.NODE_ENV || 'development';

export const App = {
    port: process.env.PORT || 3000,
    root: path,
    env: env,
    start() {
        if(1) {
            app.listen(this.port , () => {
                console.log(`Running Netflix on port ${this.port} in ${this.env} mode`);
            });
        }
    }
};
