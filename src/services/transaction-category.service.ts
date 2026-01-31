import { TransactionCategoryCreateInput } from "../../generated/prisma/models/TransactionCategory";
import prisma from "../client";

export class TransactionCategoryService {
  create(requestBody: TransactionCategoryCreateInput) {
    return prisma.transactionCategory.create({
      data: {
        userId: requestBody.userId,
        name: requestBody.name,
        parentId: requestBody.parentId,
      },
    });
  }
}
