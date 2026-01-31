import { Request, Response } from "express";
import { TransactionCategoryCreateInput } from "../../generated/prisma/models/TransactionCategory";
import { TransactionCategoryService } from "../services/transaction-category.service";

export class TransactionCategoryController {
  constructor(
    private readonly transactionCategoryService: TransactionCategoryService,
  ) {}

  createTransactionCategory = async (
    req: Request<{}, {}, TransactionCategoryCreateInput>,
    res: Response,
  ) => {
    const newTransactionCategory = await this.transactionCategoryService.create(
      req.body,
    );

    return res.status(201).json(newTransactionCategory);
  };
}
