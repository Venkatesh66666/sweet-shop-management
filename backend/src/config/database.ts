import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("database.sqlite");

db.serialize(() => {
  // Drop old table (safe for dev/testing)
  db.run(`DROP TABLE IF EXISTS users`);

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT NOT NULL
    )
  `);
});

export const clearUsersTable = () => {
  db.run("DELETE FROM users");
};
