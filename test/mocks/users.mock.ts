import { UserRole } from '@prisma/client';

export const mockAdminUser = {
  id: 1,
  name: 'Admin User',
  email: 'admin@example.com',
  password: '$2b$10$adminHashedMock', // contoh hash
  role: UserRole.ADMIN,
  isActive: true,
  createdAt: new Date('2024-01-01T08:00:00Z'),
  updatedAt: new Date('2024-01-01T08:00:00Z'),
};

export const mockRegularUser = {
  id: 2,
  name: 'Regular User',
  email: 'user@example.com',
  password: '$2b$10$userHashedMock',
  role: UserRole.USER,
  isActive: true,
  createdAt: new Date('2024-01-01T08:00:00Z'),
  updatedAt: new Date('2024-01-01T08:00:00Z'),
};
