import { Router } from "express";
import { TransactionCategoryService } from "../services/transaction-category.service";
import { TransactionCategoryController } from "../controllers/transaction-category.controller";

const router = Router();
const transactionCategoryService = new TransactionCategoryService();
const transactionCategoryController = new TransactionCategoryController(
  transactionCategoryService,
);

router.post("/", transactionCategoryController.createTransactionCategory);
router.get("/:id", transactionCategoryController.getTransactionCategory);

export default router;
