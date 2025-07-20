

export interface ITransaction {
  id: number;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  description?: string;
  accountId: number;
  createdAt: Date;
  updatedAt: Date;
}

