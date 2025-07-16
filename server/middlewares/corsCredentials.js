import { ALLOWEDORIGINS } from "../utils/SD.js";


export const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (ALLOWEDORIGINS.includes(origin))
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
        res.header("Access-Control-Allow-Origin", "https://fuo-cbt.vercel.app");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
    return next();
}