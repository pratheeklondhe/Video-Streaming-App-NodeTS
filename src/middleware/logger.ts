export function logger(req:Request, res:any, next:any ) {
    console.log(`Request made for url = ${req.url}`);
    next();
}