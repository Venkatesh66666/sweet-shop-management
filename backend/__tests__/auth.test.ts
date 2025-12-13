import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });
});
