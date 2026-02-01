import { Body, Controller, Get, Path, Post, Request, Route, Tags } from '@tsoa/runtime';

import { TransactionService } from '../services/transaction.service';
import { AuthenticatedRequest } from '../types/express';

export interface CreateTransactionRequest {
  name: string;
  amount: number;
  transactionCategoryId?: number;
}

@Route('transactions')
@Tags('Transactions')
export class TransactionController extends Controller {
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
    const { name, amount, transactionCategoryId } = body;

    const userId = request.user.id;

    return new TransactionService().create({
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
