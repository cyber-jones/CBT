import jwt from "jsonwebtoken"



export const verifyAccess = (req, res, next) => {
    const token = req.headers.Authorization || req.headers.authorization;

    if (token == null || !token?.startsWith("Bearer")) 
        return res.status(401).json({ success: false, message: "Unauthorized!" });

    const identityOpt = { issuer: process.env.ISSUER, audience: process.env.AUDIENCE }
    
    const accessToken = token?.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE, identityOpt, (err, user) => {
        if (err)
            return res.status(403).json({ success: false, message: "Forbidden!" });

        const roles = user.roles;
        req.user = user.id;
        req.email = user.email;
        req.roles = roles;

        return next();
    });
}