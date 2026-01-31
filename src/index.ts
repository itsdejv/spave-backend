import "dotenv/config";
import express from "express";
import { RegisterRoutes } from "./generated/routes";

const app = express();

app.use(express.json());

RegisterRoutes(app);

app.use((err: any, req: any, res: any, next: any) => {
  console.error("DEBUG:", err.message);

  if (err.code === "P2025") {
    return res.status(404).json({ error: "Not Found", message: err.message });
  }

  res.status(err.status || 500).json({
    error: "Server Error",
    message: err.message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is currently running on http://localhost:${PORT}`);
});
