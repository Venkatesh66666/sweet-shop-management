import jwt from "jsonwebtoken";

const JWT_SECRET = "sweetshop_secret";

export const generateToken = (payload: {
  id: number;
  role: string;
}): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
