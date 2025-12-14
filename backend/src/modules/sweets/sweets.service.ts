import { db } from "../../config/database";

export interface SweetInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

/*
 Create a new sweet
*/
export const createSweetService = (data: SweetInput): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO sweets (name, category, price, quantity)
      VALUES (?, ?, ?, ?)
      `,
      [data.name, data.category, data.price, data.quantity],
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};

/*
 Get all sweets
*/
export const getAllSweetsService = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM sweets`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

/*
 Search sweets by name, category, and/or price range
*/
export const searchSweetsService = (
  name?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
): Promise<any[]> => {
  let query = `SELECT * FROM sweets WHERE 1=1`;
  const params: any[] = [];

  if (name) {
    query += ` AND name LIKE ?`;
    params.push(`%${name}%`);
  }

  if (category) {
    query += ` AND category LIKE ?`;
    params.push(`%${category}%`);
  }

  if (minPrice !== undefined) {
    query += ` AND price >= ?`;
    params.push(minPrice);
  }

  if (maxPrice !== undefined) {
    query += ` AND price <= ?`;
    params.push(maxPrice);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

/*
 Update sweet details
*/
export const updateSweetService = (
  id: number,
  data: SweetInput
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE sweets
      SET name = ?, category = ?, price = ?, quantity = ?
      WHERE id = ?
      `,
      [data.name, data.category, data.price, data.quantity, id],
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};

/*
 Delete sweet
*/
export const deleteSweetService = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM sweets WHERE id = ?`, [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
