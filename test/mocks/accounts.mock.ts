import { AccountStatus, AccountType } from '@prisma/client';

export const mockAdminAccount = {
  id: 1,
  name: 'Admin Checking',
  type: AccountType.CHECKING,
  status: AccountStatus.ACTIVE,
  balance: 5000.0,
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
  balance: 1200.0,
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
  balance: 3000.0,
  currency: 'USD',
  userId: 2,
  createdAt: new Date('2024-01-01T08:00:00Z'),
  updatedAt: new Date('2024-01-01T08:00:00Z'),
};
