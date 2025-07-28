import { Decimal } from '@prisma/client/runtime/library';
import { TransactionStatus, TransactionType, Transaction } from '@prisma/client';
import { CreateTransactionDto } from 'src/transaction/dto/request/create-transaction.dto';
import { UpdateTransactionDto } from 'src/transaction/dto/request/upate-transaction.dto';

// ✅ Full valid Transaction[] mock
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

// ✅ DTOs
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

// ✅ Mock Transaction Repository
export const mockTransactionRepository = {
  create: jest.fn().mockImplementation((dto: CreateTransactionDto): Transaction => ({
    id: 99,
    amount: new Decimal(dto.amount),
    type: dto.type,
    category: dto.category ?? null,
    description: dto.description ?? null,
    reference: dto.reference ?? null,
    status: dto.status ?? TransactionStatus.PENDING,
    fromAccountId: dto.fromAccountId ?? null,
    toAccountId: dto.toAccountId ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),

  findAll: jest.fn().mockResolvedValue(mockTransactionList),

  findOne: jest.fn().mockImplementation((id: number): Promise<Transaction | null> => {
    const result = mockTransactionList.find(tx => tx.id === id);
    return Promise.resolve(result ?? null);
  }),

  update: jest.fn().mockImplementation((id: number, dto: UpdateTransactionDto): Promise<Transaction | null> => {
    const existing = mockTransactionList.find(tx => tx.id === id);
    if (!existing) return Promise.resolve(null);

    return Promise.resolve({
      ...existing,
      ...dto,
      amount: dto.amount ? new Decimal(dto.amount) : existing.amount,
      updatedAt: new Date(),
    });
  }),

  remove: jest.fn().mockImplementation((id: number): Promise<boolean> => {
    const exists = mockTransactionList.some(tx => tx.id === id);
    return Promise.resolve(exists);
  }),
};
