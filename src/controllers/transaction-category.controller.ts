import { Request, Response } from "express";
import { TransactionCategoryCreateInput } from "../../generated/prisma/models/TransactionCategory";
import { TransactionCategoryService } from "../services/transaction-category.service";

interface GetCategoryParams {
  id: string;
}

export class TransactionCategoryController {
  constructor(
    private readonly transactionCategoryService: TransactionCategoryService,
  ) {}

  getTransactionCategory = async (
    req: Request<GetCategoryParams>,
    res: Response,
  ) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid ID format. Expected a number.",
      });
    }

    const transactionCategory = await this.transactionCategoryService.getById(
      Number(req.params.id),
    );

    if (!transactionCategory) {
      return res.status(404).json({
        error: "Not Found",
        message: "Transaction category not found.",
      });
    }

    return res.status(200).json({ transactionCategory });
  };

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
