// src/transaction/transaction.module.ts
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionsRepository } from './transaction.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    PrismaService,
    {
      provide: 'TransactionRepository',
      useClass: TransactionsRepository,
    },
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
