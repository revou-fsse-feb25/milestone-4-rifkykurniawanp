import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ITransactionsRepository } from './interface/transaction.repository.interface';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from './dto/request/create-transaction.dto';
import { UpdateTransactionDto } from './dto/request/upate-transaction.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionsRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const preparedDto = {
      ...dto,
      amount: new Decimal(dto.amount),
    };
    return this.transactionRepository.create(preparedDto);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async findOne(id: number): Promise<Transaction> {
    const tx = await this.transactionRepository.findOne(id);
    if (!tx) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return tx;
  }

  async update(id: number, dto: UpdateTransactionDto): Promise<Transaction> {
    const preparedDto = {
      ...dto,
      amount: dto.amount !== undefined ? new Decimal(dto.amount) : undefined,
    };
    const updated = await this.transactionRepository.update(id, preparedDto);
    if (!updated) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const existing = await this.transactionRepository.findOne(id);
    if (!existing) return false;
    return this.transactionRepository.remove(id);
  }

  async testDecimalFields() {
    console.log('=== TESTING DECIMAL FIELDS ===');
    
    const account = await this.prisma.account.findFirst();
    console.log('Raw account from DB:', account);
    console.log('Balance type:', typeof account?.balance);
    console.log('Balance value:', account?.balance);
    
    const transaction = await this.prisma.transaction.findFirst();
    console.log('Raw transaction from DB:', transaction);
    console.log('Amount type:', typeof transaction?.amount);
    console.log('Amount value:', transaction?.amount);
    
    console.log('=== END TEST ===');
  }
  
}
