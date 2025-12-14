import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json()); 

app.use("/api", routes);

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;
