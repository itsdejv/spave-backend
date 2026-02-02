import { Body, Controller, Get, Path, Post, Request, Route, Tags } from '@tsoa/runtime';

import { TransactionCategoryService } from '../services/transaction-category.service';
import { AuthenticatedRequest } from '../types/express';

export interface CreateCategoryRequest {
  name: string;
  parentId?: number | null;
  color?: string;
  icon?: string;
}

@Route('transaction-categories')
@Tags('TransactionCategory')
export class TransactionCategoryController extends Controller {
  @Get('')
  public async getTransactionGategories(@Request() request: AuthenticatedRequest) {
    const userId = request.user.id;

    const transactionCategories = await new TransactionCategoryService().findAll(userId);

    if (!transactionCategories) {
      this.setStatus(404);
      return;
    }

    return transactionCategories;
  }

  @Get('{id}')
  public async getTransactionGategory(
    @Path() id: number,
    @Request() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;

    const transactionCategory = await new TransactionCategoryService().getById(id, userId);

    if (!transactionCategory) {
      this.setStatus(404);
      return;
    }

    return transactionCategory;
  }

  @Post()
  public async createTransactionCategory(
    @Body() body: CreateCategoryRequest,
    @Request() request: AuthenticatedRequest,
  ) {
    const { name, parentId, color, icon } = body;

    const userId = request.user.id;

    return new TransactionCategoryService().create({
      name,
      userId,
      color,
      icon,
      parent: parentId ? { connect: { id: parentId } } : undefined,
    });
  }
}
