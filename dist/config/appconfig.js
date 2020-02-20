"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.Mongo = mongoose_1.default;
const app = express_1.default();
exports.app = app;
const env = process.env.NODE_ENV || 'development';
const mongodb = process.env.NODE_MONGO || 'mongodb://localhost/local_sample';
let App = {
    port: process.env.PORT || 3000,
    root: path_1.default,
    env: env,
    start() {
        if (1) {
            app.listen(this.port, () => {
                console.log(`Running Netflix on port ${this.port} in ${this.env} mode`);
            });
        }
    },
    mongoConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
                return `Mongoose Connected to ${mongodb}`;
            }
            catch (e) {
                throw new Error(`Could not Connect to ${mongodb}`);
            }
        });
    }
};
exports.App = App;
//# sourceMappingURL=appconfig.js.map