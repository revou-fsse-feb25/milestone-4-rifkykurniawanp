import { Transaction, TransactionStatus, TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type TransactionInput = {
  amount: Decimal;
  type: TransactionType;
  category?: string;
  description?: string;
  reference?: string;
  status?: TransactionStatus;
  fromAccountId?: number;
  toAccountId?: number;
};

export type TransactionUpdateInput = Partial<TransactionInput>;

export interface ITransactionsRepository {
  findAll(): Promise<Transaction[]>;
  findOne(id: number): Promise<Transaction | null>;
  create(data: TransactionInput): Promise<Transaction>;
  update(id: number, data: TransactionUpdateInput): Promise<Transaction | null>;
  remove(id: number): Promise<boolean>;
}
