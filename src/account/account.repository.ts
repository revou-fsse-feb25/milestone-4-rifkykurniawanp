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
      include: { user: true },
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
        balance: this.toDecimal(data.balance),
      },
    });
  }

  async update(id: number, data: AccountUpdateInput): Promise<Account> {
    return this.prisma.account.update({
      where: { id },
      data: {
        ...data,
        balance: this.toOptionalDecimal(data.balance),
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

  private toDecimal(value: number | Decimal | undefined | null): Decimal {
    if (value instanceof Decimal) return value;
    if (typeof value === 'number') return new Decimal(value);
    return new Decimal(0);
  }

  private toOptionalDecimal(value?: number | Decimal | null): Decimal | undefined {
    if (value === null || value === undefined) return undefined;
    return this.toDecimal(value);
  }
}
