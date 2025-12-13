import request from "supertest";
import app from "../src/app";
import { clearUsersTable, clearSweetsTable } from "../src/config/database";
import sqlite3 from "sqlite3";

describe("Sweets API", () => {

  beforeEach(() => {
    clearUsersTable();
    clearSweetsTable();
  });

  it("should allow admin to add a sweet", async () => {
    // Register user
    await request(app).post("/api/auth/register").send({
      email: "admin@mail.com",
      password: "admin123"
    });

    const db = new sqlite3.Database("database.sqlite");

    // ✅ WAIT for role update
    await new Promise<void>((resolve, reject) => {
      db.run(
        "UPDATE users SET role='ADMIN' WHERE email='admin@mail.com'",
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    // Login AFTER role is updated
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin@mail.com",
      password: "admin123"
    });

    const token = loginRes.body.token;

    // Add sweet
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 50
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Ladoo");
  });

  it("should allow anyone to view all sweets", async () => {
    const db = new sqlite3.Database("database.sqlite");

    await new Promise<void>((resolve, reject) => {
      db.run(
        "INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)",
        ["Jalebi", "Indian", 15, 30],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    const response = await request(app).get("/api/sweets");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].name).toBe("Jalebi");
  });

});
