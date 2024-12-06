import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(`token: ${token}`);
    if(!token){
        return res.status(404).json({
            message: "Access token is required",
            success: false
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log("Verify token: "+ JSON.stringify(user));
        if(err) return res.json({
            message: err.name === "TokenExpiredError" ? "Access token is expired" : "Access token is invalid",
            success: false
        });
        req.user = user;
        console.log("Now going to next step...");
        next();
    })
}