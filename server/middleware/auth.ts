import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) return res.status(401).json({ error: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = verified; 
        next(); 
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};
