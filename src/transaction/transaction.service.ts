// src/transaction/transaction.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { ITransaction } from './interface/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<ITransaction> {
    const tx = this.transactionRepo.create(dto);
    return await this.transactionRepo.save(tx);
  }

  async findAll(): Promise<ITransaction[]> {
    return this.transactionRepo.find();
  }

  async findByAccount(accountId: number): Promise<ITransaction[]> {
    return this.transactionRepo.find({
      where: { accountId },
      order: { timestamp: 'DESC' },
    });
  }

  async delete(id: number): Promise<void> {
    await this.transactionRepo.delete(id);
  }
}
