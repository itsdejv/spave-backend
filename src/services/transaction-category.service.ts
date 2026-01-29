import { TransactionCategoryCreateInput } from "../../generated/prisma/models/TransactionCategory";
import prisma from "../client";

export const createTransactionCategory = (
  data: TransactionCategoryCreateInput,
) => {
  return prisma.transactionCategory.create({
    data: {
      userId: data.userId,
      name: data.name,
      parentId: data.parentId,
    },
  });
};
