import { Decimal } from '@prisma/client/runtime/library';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { CreateTransactionDto } from 'src/transaction/dto/request/create-transaction.dto';
import { UpdateTransactionDto } from 'src/transaction/dto/request/upate-transaction.dto';
import { Transaction } from '@prisma/client';

export const mockTransactionList: Transaction[] = [
  {
    id: 1,
    amount: new Decimal(2000.0),
    type: TransactionType.DEPOSIT,
    category: 'Salary',
    description: 'Admin monthly salary',
    reference: 'TXN-ADM-001',
    status: TransactionStatus.COMPLETED,
    fromAccountId: null,
    toAccountId: 1,
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-01T08:00:00Z'),
  },
  {
    id: 2,
    amount: new Decimal(1000.0),
    type: TransactionType.DEPOSIT,
    category: 'Freelance',
    description: 'Freelance income',
    reference: 'TXN-USER-001',
    status: TransactionStatus.COMPLETED,
    fromAccountId: null,
    toAccountId: 2,
    createdAt: new Date('2024-01-02T08:00:00Z'),
    updatedAt: new Date('2024-01-02T08:00:00Z'),
  },
];

export const createTransactionDto: CreateTransactionDto = {
  amount: 1500.0,
  type: TransactionType.TRANSFER,
  category: 'Family Support',
  description: 'Transfer ke orang tua',
  reference: 'TXN-MOCK-004',
  status: TransactionStatus.PENDING,
  fromAccountId: 2,
  toAccountId: 3,
};

export const updateTransactionDto: UpdateTransactionDto = {
  description: 'Updated desc',
  status: TransactionStatus.COMPLETED,
  amount: 1800.0,
};

// Mock repository implementation for TransactionService
export const mockTransactionRepository = {
  create: jest.fn().mockImplementation((dto: any) => ({
    id: 99,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...dto,
    amount: new Decimal(dto.amount),
  })),

  findAll: jest.fn().mockResolvedValue(mockTransactionList),

  findOne: jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(mockTransactionList.find(tx => tx.id === id) ?? null);
  }),

  update: jest.fn().mockImplementation((id: number, dto: UpdateTransactionDto) => {
    const existing = mockTransactionList.find(tx => tx.id === id);
    if (!existing) return null;
    return Promise.resolve({
      ...existing,
      ...dto,
      amount: dto.amount ? new Decimal(dto.amount) : existing.amount,
      updatedAt: new Date(),
    });
  }),

  remove: jest.fn().mockImplementation((id: number) => {
    const found = mockTransactionList.some(tx => tx.id === id);
    return Promise.resolve(found);
  }),
};
