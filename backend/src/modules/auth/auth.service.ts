import bcrypt from "bcrypt";
import { db } from "../../config/database";
import { generateToken } from "../../utils/jwt";

interface DbUser {
  id: number;
  email: string;
  password: string;
  role: string;
}

export const registerUser = (
  email: string,
  password: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
      `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
      [email, hashedPassword, "USER"],
      err => (err ? reject(err) : resolve())
    );
  });
};

export const loginUser = (
  email: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (err, user: DbUser) => {
        if (err || !user)
          return reject(new Error("Invalid credentials"));

        if (!bcrypt.compareSync(password, user.password))
          return reject(new Error("Invalid credentials"));

        const token = generateToken({
          id: user.id,
          role: user.role,
        });

        resolve(token);
      }
    );
  });
};
