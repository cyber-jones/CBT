import {  ALLOWEDHEADERS, ALLOWEDORIGINS, ALLOWEDMETHODS } from "../utils/SD.js";



export const corsOptions = {
    origin: (origin, callback) => {
        if(ALLOWEDORIGINS.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }, 
    optionsSuccessStatus: 200,
    credentials: 'include',
    allowedHeaders: ALLOWEDHEADERS,
    methods: ALLOWEDMETHODS
}