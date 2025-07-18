// src/transaction/interfaces/transaction.interface.ts

import { TransactionType } from '../entities/transaction.entity';
import { IAccount } from 'src/account/account.interface';

export interface ITransaction {
  id: number;
  type: TransactionType;
  amount: number;
  description?: string;
  account: IAccount;
  createdAt: Date;
  updatedAt: Date;
}
