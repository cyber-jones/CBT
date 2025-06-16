import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
// import { v4:format } from "date-fns"
import generateID from "../utils/generateID.js";
import __dirname from "./directoryConfig.js";


export const logger = async (message, fileName) => {
    const date = new Date().toDateString();
    const Id = generateID();
    const data = `${message}\t${Id}\t${date}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, "..", "logs"))) 
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        
        await fsPromises.appendFile(path.join(__dirname, "..", "logs", fileName), data);
    } catch (err) {
        throw err
    }
}



export const reqLogger = (req, res, next) => {
    try {
        const message = `${req.method}\t${req.headers.origin}\t${req.hostname}${req.url}`;
        console.log(message);
        logger(message, "reqLog.txt");
        next();
    } catch (err) {
        next(err);
    }
}
