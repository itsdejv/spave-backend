import { TransactionCategoryCreateInput } from '../../generated/prisma/models/TransactionCategory';
import prisma from '../client';

export class TransactionCategoryService {
  findAll(userId: string) {
    return prisma.transactionCategory.findMany({
      where: {
        userId,
      },
    });
  }

  getById(id: number, userId: string) {
    return prisma.transactionCategory.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  create(requestBody: TransactionCategoryCreateInput) {
    return prisma.transactionCategory.create({
      data: requestBody,
    });
  }
}
