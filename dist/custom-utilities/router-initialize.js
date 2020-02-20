"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_creation_1 = require("../user-creation/user-creation");
const user_authentication_1 = require("../authenticate/user-authentication");
const genre_creation_1 = require("../genre/genre-creation");
const genre_crud_1 = require("../genre/genre-crud");
function initializeRouters(app) {
    app.use('/api/usercreation', user_creation_1.userCreationRouter);
    app.use('/api/userauthentication', user_authentication_1.userAuthenticationRouter);
    app.use('/api/genre', genre_creation_1.genreRouter);
    app.use('/api/retreivegenre', genre_crud_1.genreCrudRouter);
}
exports.initializeRouters = initializeRouters;
//# sourceMappingURL=router-initialize.js.map