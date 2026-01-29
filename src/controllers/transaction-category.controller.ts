import { Request, Response } from "express";
import { TransactionCategoryCreateInput } from "../../generated/prisma/models/TransactionCategory";
import prisma from "../client";

export const saveTransactionCategory = async (
  req: Request<{}, {}, TransactionCategoryCreateInput>,
  res: Response,
) => {
  const { name, parentId, userId } = req.body;

  try {
    const newTransactionCategory = await prisma.transactionCategory.create({
      data: {
        name,
        parentId,
        userId,
      },
    });

    res.status(201).json(newTransactionCategory);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error while saving." });
  }
};
