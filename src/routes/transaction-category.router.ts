import { Router } from "express";
import { saveTransactionCategory } from "../controllers/transaction-category.controller";

const router = Router();

router.post("/", saveTransactionCategory);

export default router;
