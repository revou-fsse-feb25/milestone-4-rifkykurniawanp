import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ITransactionsRepository,
  TransactionInput,
  TransactionUpdateInput,
} from './interface/transaction.repository.interface';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionsRepository implements ITransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  async findOne(id: number): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  async create(data: TransactionInput): Promise<Transaction> {
    return this.prisma.transaction.create({
      data,
    });
  }

  async update(id: number, data: TransactionUpdateInput): Promise<Transaction | null> {
    return this.prisma.transaction.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.prisma.transaction.delete({
      where: { id },
    });
    return !!deleted;
  }
}
