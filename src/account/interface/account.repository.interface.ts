import { Account, Prisma } from '@prisma/client';

export interface IAccountRepository {
  findAll(): Promise<Account[]>;
  findOne(id: number): Promise<Account | null>;
  create(data: Prisma.AccountCreateInput): Promise<Account>;
  update(id: number, data: Prisma.AccountUpdateInput): Promise<Account | null>;
  remove(id: number): Promise<boolean>;
  findByEmail(email: string): Promise<Account | null>;
  
  // Optional: Add more specific queries if needed
  findByUserId(userId: number): Promise<Account[]>;
  findActiveAccounts(): Promise<Account[]>;
}