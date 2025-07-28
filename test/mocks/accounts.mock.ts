// test/mocks/account.mock.ts

import { AccountStatus, AccountType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const mockAdminAccount = {
  id: 1,
  name: 'Admin Checking',
  type: AccountType.CHECKING,
  status: AccountStatus.ACTIVE,
  balance: new Decimal(5000),
  currency: 'USD',
  userId: 1,
  createdAt: new Date('2024-01-01T08:00:00Z'),
  updatedAt: new Date('2024-01-01T08:00:00Z'),
};

export const mockUserChecking = {
  id: 2,
  name: 'User Checking',
  type: AccountType.CHECKING,
  status: AccountStatus.ACTIVE,
  balance: new Decimal(1200),
  currency: 'USD',
  userId: 2,
  createdAt: new Date('2024-01-01T08:00:00Z'),
  updatedAt: new Date('2024-01-01T08:00:00Z'),
};

export const mockUserSavings = {
  id: 3,
  name: 'User Savings',
  type: AccountType.SAVINGS,
  status: AccountStatus.ACTIVE,
  balance: new Decimal(3000),
  currency: 'USD',
  userId: 2,
  createdAt: new Date('2024-01-01T08:00:00Z'),
  updatedAt: new Date('2024-01-01T08:00:00Z'),
};

export const mockAccountList = [
  mockAdminAccount,
  mockUserChecking,
  mockUserSavings,
];

export const sampleCreateAccountDto = {
  name: 'New Account',
  type: AccountType.SAVINGS,
  userId: 2,
  balance: 500,
};

export const sampleUpdateAccountDto = {
  name: 'Updated Name',
  balance: 1000,
};

export const mockAccountRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

export const mockPrismaService = {
  account: {
    findFirst: jest.fn(),
  },
  transaction: {
    findFirst: jest.fn(),
  },
};

export const mockTransaction = {
  id: 1,
  fromAccountId: 2,
  toAccountId: 1,
  amount: new Decimal(500),
  createdAt: new Date(),
};
