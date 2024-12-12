import jwt from 'jsonwebtoken';
import UserModel from '../models/users.model'

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

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({
            message: "You don't have access."
        });
    }
};

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user; // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};