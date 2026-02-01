import { TransactionCreateInput } from '../../generated/prisma/models/Transaction';
import prisma from '../client';

export class TransactionService {
  getById(id: number, userId: string) {
    return prisma.transactionCategory.findFirst({ where: { id, userId } });
  }

  create(body: TransactionCreateInput) {
    return prisma.transaction.create({
      data: body,
    });
  }
}
