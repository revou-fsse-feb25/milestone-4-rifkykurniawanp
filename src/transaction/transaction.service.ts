import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/request/create-transaction.dto.js';
import { UpdateTransactionDto } from './dto/request/upate-transaction.dto.js';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    return this.prisma.transaction.create({ data: dto });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        account: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({ 
      where: { id },
      include: {
        account: {
          include: {
            user: true
          }
        }
      }
    });
    if (!transaction) throw new NotFoundException(`Transaction with id ${id} not found`);
    return transaction;
  }

  async update(id: number, dto: UpdateTransactionDto) {
    // Pastikan transaction exist dulu
    await this.findOne(id);
    return this.prisma.transaction.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists
    await this.prisma.transaction.delete({ where: { id } });
    return { message: `Transaction with id ${id} removed` };
  }
}