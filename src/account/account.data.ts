import { Account } from './interface/account.interface';

export const accounts: Account[] = [
  {
    id: 1,
    accountHolderName: 'John Doe',
    accountNumber: '1234567890',
    bankName: 'Bank A',
    balance: 1000000,
    currency: 'IDR',
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-01T10:00:00Z'),
    isActive: true,
  },
  {
    id: 2,
    accountHolderName: 'Jane Smith',
    accountNumber: '0987654321',
    bankName: 'Bank B',
    balance: 2000000,
    currency: 'USD',
    createdAt: new Date('2023-02-01T10:00:00Z'),
    updatedAt: new Date('2023-02-01T10:00:00Z'),
    isActive: true,
  },
];
