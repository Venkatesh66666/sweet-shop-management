import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      quantity INTEGER
    )
  `);
});

// ✅ PROMISE-BASED HELPERS (CRITICAL)
export const clearUsersTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const clearSweetsTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM sweets", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
