import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../config/database";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err: Error | null) => {
      if (err) {
        return res.status(400).json({ message: "User already exists" });
      }

      return res.status(201).json({
        message: "User registered successfully",
        email,
      });
    }
  );
};
