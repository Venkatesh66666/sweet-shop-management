import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../config/database";

const JWT_SECRET = "secret";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [email, hashedPassword, "USER"],
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

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err: Error | null, user: any) => {
      if (err || !user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role, // ✅ REQUIRED
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ token });
    }
  );
};
