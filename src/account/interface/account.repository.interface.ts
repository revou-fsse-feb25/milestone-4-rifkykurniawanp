import { AccountStatus, AccountType, Account } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type AccountInput = {
  name: string;
  userId: number;
  type?: AccountType;
  status?: AccountStatus;
  balance?: Decimal;
  currency?: string;
};

export type AccountUpdateInput = Partial<AccountInput>;

export interface IAccountsRepository {
  findAll(): Promise<Account[]>;
  findOne(id: number): Promise<Account | null>;
  findByUserId(userId: number): Promise<Account[]>;

  create(data: AccountInput): Promise<Account>;
  update(id: number, data: AccountUpdateInput): Promise<Account | null>;
  remove(id: number): Promise<boolean>;
}
