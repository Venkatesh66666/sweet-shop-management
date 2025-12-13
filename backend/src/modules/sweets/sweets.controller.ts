import { Request, Response } from "express";
import { db } from "../../config/database";

export const addSweet = (req: Request, res: Response) => {
  const { name, category, price, quantity } = req.body;

  db.run(
    "INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)",
    [name, category, price, quantity],
    function (err: Error | null) {
      if (err) {
        return res.status(400).json({ message: "Failed to add sweet" });
      }

      return res.status(201).json({
        id: this.lastID,
        name,
        category,
        price,
        quantity,
      });
    }
  );
};
