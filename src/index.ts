import "dotenv/config";
import express from "express";
import transactionCategoryRouter from "./routes/transaction-category.router";

const app = express();

app.use(express.json());

app.use("/api/categories", transactionCategoryRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is currently running on http://localhost:${PORT}`);
});
