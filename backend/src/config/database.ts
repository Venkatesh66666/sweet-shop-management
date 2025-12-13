import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("database.sqlite");

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`DROP TABLE IF EXISTS sweets`);

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE sweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      quantity INTEGER
    )
  `);
});

export const clearUsersTable = () => {
  db.run("DELETE FROM users");
};
