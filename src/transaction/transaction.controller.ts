
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { ITransaction } from './interface/transaction.interface';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto): Promise<ITransaction> {
    return this.transactionService.create(dto);
  }

  @Get()
  findAll(): Promise<ITransaction[]> {
    return this.transactionService.findAll();
  }

  @Get('account/:accountId')
  findByAccount(@Param('accountId') accountId: string): Promise<ITransaction[]> {
    return this.transactionService.findByAccount(+accountId);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.transactionService.delete(+id);
  }
}
