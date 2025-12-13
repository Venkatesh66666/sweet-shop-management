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

export const getAllSweets = (_req: Request, res: Response) => {
  db.all("SELECT * FROM sweets", [], (err: Error | null, rows: any[]) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch sweets" });
    }

    return res.status(200).json(rows);
  });
};

export const updateSweet = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;

  db.run(
    `
    UPDATE sweets 
    SET 
      name = COALESCE(?, name),
      category = COALESCE(?, category),
      price = COALESCE(?, price),
      quantity = COALESCE(?, quantity)
    WHERE id = ?
    `,
    [name, category, price, quantity, id],
    function (err: Error | null) {
      if (err) {
        return res.status(400).json({ message: "Failed to update sweet" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Sweet not found" });
      }

      db.get(
        "SELECT * FROM sweets WHERE id = ?",
        [id],
        (err2: Error | null, row: any) => {
          if (err2 || !row) {
            return res.status(500).json({ message: "Failed to fetch updated sweet" });
          }

          return res.status(200).json(row);
        }
      );
    }
  );
};
