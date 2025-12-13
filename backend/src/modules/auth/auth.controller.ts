import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  return res.status(201).json({
    message: "User registered successfully",
  });
};
