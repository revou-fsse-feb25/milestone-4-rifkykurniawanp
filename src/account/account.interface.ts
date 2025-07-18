// src/account/interfaces/account.interface.ts

export interface IAccount {
  id: number;
  accountNumber: string;
  balance: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
