import { TransactionCreateInput } from '../../generated/prisma/models/Transaction';
import prisma from '../client';

export class TransactionService {
  findAll(userId: string) {
    return prisma.transactionCategory.findMany({ where: { userId } });
  }

  getById(id: number, userId: string) {
    return prisma.transactionCategory.findFirst({ where: { id, userId } });
  }

  create(body: TransactionCreateInput) {
    return prisma.transaction.create({
      data: body,
    });
  }
}
