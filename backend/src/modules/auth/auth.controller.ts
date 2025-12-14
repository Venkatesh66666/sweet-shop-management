import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

/*
 POST /api/auth/register
*/
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    await registerUser(email, password);

    return res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE")
    ) {
      return res
        .status(409)
        .json({ message: "User already exists" });
    }

    return res
      .status(500)
      .json({ message: "Registration failed" });
  }
};

/*
 POST /api/auth/login
*/
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const token = await loginUser(email, password);

    return res.status(200).json({ token });
  } catch {
    return res
      .status(401)
      .json({ message: "Invalid credentials" });
  }
};
