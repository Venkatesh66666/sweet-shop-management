import request from "supertest";
import app from "../src/app";
import { clearUsersTable, clearSweetsTable } from "../src/config/database";
import sqlite3 from "sqlite3";

describe("Sweets API", () => {
  beforeEach(async () => {
    await clearUsersTable();
    await clearSweetsTable();
  });

  it("should allow admin to add a sweet", async () => {
    await request(app).post("/api/auth/register").send({
      email: "admin@mail.com",
      password: "admin123",
    });

    const db = new sqlite3.Database("database.sqlite");

    await new Promise<void>((resolve, reject) => {
      db.run(
        "UPDATE users SET role='ADMIN' WHERE email='admin@mail.com'",
        (err: Error | null) => (err ? reject(err) : resolve())
      );
    });

    db.close(); 

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin@mail.com",
      password: "admin123",
    });

    expect(loginRes.body.token).toBeDefined(); 

    const token = loginRes.body.token;

    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 50,
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
        (err) => (err ? reject(err) : resolve())
      );
    });

    db.close();

    const response = await request(app).get("/api/sweets");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should allow admin to update a sweet", async () => {
    await request(app).post("/api/auth/register").send({
      email: "admin2@mail.com",
      password: "admin123",
    });

    const db = new sqlite3.Database("database.sqlite");

    await new Promise<void>((resolve, reject) => {
      db.run(
        "UPDATE users SET role='ADMIN' WHERE email='admin2@mail.com'",
        (err) => (err ? reject(err) : resolve())
      );
    });

    const sweetId = await new Promise<number>((resolve, reject) => {
      db.run(
        "INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)",
        ["Barfi", "Indian", 20, 40],
        function (this: any, err) {
          err ? reject(err) : resolve(this.lastID);
        }
      );
    });

    db.close();

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin2@mail.com",
      password: "admin123",
    });

    const token = loginRes.body.token;

    const response = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Kaju Barfi",
        price: 25,
        quantity: 30,
      });

    expect(response.status).toBe(200);
  });

  it("should allow admin to delete a sweet", async () => {
    await request(app).post("/api/auth/register").send({
      email: "admin3@mail.com",
      password: "admin123",
    });

    const db = new sqlite3.Database("database.sqlite");

    await new Promise<void>((resolve, reject) => {
      db.run(
        "UPDATE users SET role='ADMIN' WHERE email='admin3@mail.com'",
        (err) => (err ? reject(err) : resolve())
      );
    });

    const sweetId = await new Promise<number>((resolve, reject) => {
      db.run(
        "INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)",
        ["Rasgulla", "Indian", 12, 20],
        function (this: any, err) {
          err ? reject(err) : resolve(this.lastID);
        }
      );
    });

    db.close();

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin3@mail.com",
      password: "admin123",
    });

    const token = loginRes.body.token;

    const response = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
