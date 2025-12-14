import request from "supertest";
import app from "../src/app";
import { clearUsersTable } from "../src/config/database";

describe("Auth API", () => {
  beforeEach(async () => {
    await clearUsersTable(); // ✅ MUST AWAIT
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@mail.com", password: "123456" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should not return plain password", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "secure@mail.com", password: "mypassword" });

    expect(response.body.password).toBeUndefined();
  });

  it("should login a registered user and return JWT token", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "login@mail.com", password: "123456" });

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@mail.com", password: "123456" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should block access to protected route without token", async () => {
    const response = await request(app).get("/api/auth/protected");
    expect(response.status).toBe(401);
  });
});
