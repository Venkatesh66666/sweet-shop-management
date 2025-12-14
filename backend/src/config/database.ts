import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "../../database.sqlite");

export const db = new sqlite3.Database(dbPath);

/* ===========================
   TABLE CREATION
=========================== */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'USER'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL
    )
  `);
});

/* ===========================
   TEST HELPERS
=========================== */
export const clearUsersTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users", (err) =>
      err ? reject(err) : resolve()
    );
  });
};

export const clearSweetsTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM sweets", (err) =>
      err ? reject(err) : resolve()
    );
  });
};
