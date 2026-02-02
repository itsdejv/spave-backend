import { Body, Controller, Get, Path, Post, Request, Route, Tags } from '@tsoa/runtime';

import { TransactionType } from '../../generated/prisma/enums';
import { TransactionService } from '../services/transaction.service';
import { AuthenticatedRequest } from '../types/express';

export interface CreateTransactionRequest {
  name: string;
  amount: number;
  date: Date;
  transactionCategoryId?: number;
  necessary?: boolean;
  note?: string;
  type?: TransactionType;
}

@Route('transactions')
@Tags('Transactions')
export class TransactionController extends Controller {
  @Get()
  public async getTransactions(@Request() request: AuthenticatedRequest) {
    const userId = request.user.id;

    const transactions = await new TransactionService().findAll(userId);

    if (!transactions) {
      this.setStatus(404);
      return;
    }

    return transactions;
  }

  @Get('{id}')
  public async getTransaction(@Path() id: number, @Request() request: AuthenticatedRequest) {
    const userId = request.user.id;

    const transaction = await new TransactionService().getById(id, userId);

    if (!transaction) {
      this.setStatus(404);
      return;
    }

    return transaction;
  }

  @Post()
  public async createTransaction(
    @Body() body: CreateTransactionRequest,
    @Request() request: AuthenticatedRequest,
  ) {
    const { name, amount, transactionCategoryId, necessary, date, type, note } = body;

    const userId = request.user.id;

    return new TransactionService().create({
      date,
      type,
      note,
      necessary,
      name,
      amount,
      userId,
      transactionCategory: {
        connect: {
          id: transactionCategoryId,
        },
      },
    });
  }
}
