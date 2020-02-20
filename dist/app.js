"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appconfig_1 = require("./config/appconfig");
const logger_1 = require("./middleware/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const CORS_1 = require("./middleware/CORS");
const genre_model_1 = require("./genre/models/genre-model");
const router_initialize_1 = require("./custom-utilities/router-initialize");
appconfig_1.app.use(body_parser_1.default.json());
appconfig_1.app.use(CORS_1.setCors);
appconfig_1.app.use(logger_1.logger);
router_initialize_1.initializeRouters(appconfig_1.app);
appconfig_1.app.post('/genre', (req) => {
    try {
        new genre_model_1.genreModel(req.body).validateRequirements();
        console.log(req.body);
        new genre_model_1.genreModel(req.body).save();
    }
    catch (e) {
        throw e;
    }
});
appconfig_1.app.get('/', (req, res) => {
    res.status(200).send('WOW, Iam up and running');
});
appconfig_1.App.start();
appconfig_1.App.mongoConnect()
    .then((data) => {
    // App.start();
    console.log(data);
})
    .catch((err) => console.error(err.message));
//# sourceMappingURL=app.js.map