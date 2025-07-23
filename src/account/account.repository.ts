import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account } from '@prisma/client';
import {
  IAccountsRepository,
  AccountInput,
  AccountUpdateInput,
} from './interface/account.repository.interface';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class AccountRepository implements IAccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Account[]> {
    return this.prisma.account.findMany({
      include: { user: true }, // optional
    });
  }

  async findOne(id: number): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findByUserId(userId: number): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  async findActiveAccounts(): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: { status: 'ACTIVE' },
      include: { user: true },
    });
  }

  async create(data: AccountInput): Promise<Account> {
    return this.prisma.account.create({
      data: {
        ...data,
        balance: new Decimal(data.balance ?? 0),
      },
    });
  }

  async update(id: number, data: AccountUpdateInput): Promise<Account> {
    return this.prisma.account.update({
      where: { id },
      data: {
        ...data,
        balance: data.balance !== undefined ? new Decimal(data.balance) : undefined,
      },
    });
  }

  async remove(id: number): Promise<boolean> {
  try {
    await this.prisma.account.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

}
