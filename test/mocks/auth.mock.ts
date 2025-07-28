// test/mocks/auth.mock.ts
import { UserRole } from '@prisma/client';
import { RegisterDto } from 'src/auth/dto/request/register.dto';
import { LoginDto } from 'src/auth/dto/request/login.dto';

export const mockRegisterDto: RegisterDto = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  role: UserRole.USER,
};

export const mockLoginDto: LoginDto = {
  email: 'test@example.com',
  password: 'password123',
};

export const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

export const mockJwtService = {
  sign: jest.fn(),
};

export const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};
