import { Request, Response, NextFunction } from "express";

/*
 Role-based authorization middleware
 Used to restrict access to Admin-only routes
*/
export const authorize =
  (requiredRole: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== requiredRole) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
