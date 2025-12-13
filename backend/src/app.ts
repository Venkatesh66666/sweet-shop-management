import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import sweetsRoutes from "./modules/sweets/sweets.routes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

export default app;
