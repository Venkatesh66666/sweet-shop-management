import request from "supertest";
import app from "../src/app";
import { clearUsersTable, clearSweetsTable } from "../src/config/database";
import sqlite3 from "sqlite3";

describe("Inventory API", () => {
  beforeEach(async () => {
    await clearUsersTable();
    await clearSweetsTable();
  });

  it("should allow user to purchase sweet and reduce stock", async () => {
    // Register user
    await request(app).post("/api/auth/register").send({
      email: "user@mail.com",
      password: "user123",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "user@mail.com",
      password: "user123",
    });

    const token = loginRes.body.token;

    const db = new sqlite3.Database("database.sqlite");

    const sweetId = await new Promise<number>((resolve, reject) => {
      db.run(
        "INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)",
        ["Peda", "Indian", 10, 5],
        function (this: any, err) {
          err ? reject(err) : resolve(this.lastID);
        }
      );
    });

    db.close();

    const response = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.remainingQuantity).toBe(3);
  });
});
