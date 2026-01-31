import { Body, Controller, Get, Path, Post, Route, Tags } from '@tsoa/runtime';

import { TransactionCategoryCreateInput } from '../../generated/prisma/models/TransactionCategory';
import { TransactionCategoryService } from '../services/transaction-category.service';

@Route('categories')
@Tags('TransactionCategory')
export class TransactionCategoryController extends Controller {
  @Get('{id}')
  public async getTransactionGategory(@Path() id: number) {
    const transactionCategory = await new TransactionCategoryService().getById(id);

    if (!transactionCategory) {
      this.setStatus(404);
      return;
    }

    return transactionCategory;
  }

  @Post()
  public async createTransactionCategory(@Body() body: TransactionCategoryCreateInput) {
    const transactionCategory = await new TransactionCategoryService().create(body);

    return transactionCategory;
  }
}
