import "dotenv/config";
import express from "express";
import transactionCategoryRouter from "./routes/transaction-category.router";

const app = express();

app.use(express.json());

app.use("/api/categories", transactionCategoryRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.error("DEBUG:", err.message);

  res.status(err.status || 500).json({
    error: "Server Error",
    message: err.message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is currently running on http://localhost:${PORT}`);
});
