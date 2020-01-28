export function setCors(req:Request, res:any, next:any) {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', ['Content-Type', 'x-auth-token']);
    res.append("Access-Control-Expose-Headers", "x-auth-token");
    next();
}