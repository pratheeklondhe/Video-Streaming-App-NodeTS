import { userCreationRouter } from "../user-creation/user-creation";
import { userAuthenticationRouter } from "../authenticate/user-authentication";
import { genreRouter } from "../genre/genre-creation";
import { genreCrudRouter } from "../genre/genre-crud";

export function initializeRouters(app: any) {
    app.use('/api/usercreation' , userCreationRouter);
    app.use('/api/userauthentication' , userAuthenticationRouter);
    app.use('/api/genre', genreRouter);
    app.use('/api/retreivegenre', genreCrudRouter);
}