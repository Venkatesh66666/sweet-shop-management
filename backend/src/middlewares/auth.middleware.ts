import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/*
 JWT secret
 (Move to env variable in production)
*/
const JWT_SECRET = "sweetshop_secret";

/*
 Authentication middleware
 Verifies JWT token and attaches user info to request
*/
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
