import { userCreationRouter } from "../user-creation/user-creation";
import { userAuthenticationRouter } from "../authenticate/user-authentication";
import { genreRouter } from "../genre/genre-creation";
import { genreCrudRouter } from "../genre/genre-crud";
import { aboutPageTrackingRouter } from "../user-activity-tracking/about-page-tracking";
import { getScrapedNewsRouter } from "../genre/other_projs/scraped_news/get-news";

export function initializeRouters(app: any) {
    app.use('/api/usercreation' , userCreationRouter);
    app.use('/api/userauthentication' , userAuthenticationRouter);
    app.use('/api/genre', genreRouter);
    app.use('/api/retreivegenre', genreCrudRouter);
    app.use('/api/session', aboutPageTrackingRouter);

    // For Services other than NetFlicks
    app.use('/api/get-scraped-news', getScrapedNewsRouter);
}