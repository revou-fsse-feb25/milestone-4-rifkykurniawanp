// src/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthError } from './enum/auth-error.enum';
import { mockLoginDto, mockRegisterDto, mockJwtService, mockPrismaService } from 'test/mocks/auth.mock';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should throw ConflictException if user already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 1 });

      await expect(service.register(mockRegisterDto)).rejects.toThrow(
        new ConflictException(AuthError.EMAIL_EXISTS),
      );

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockRegisterDto.email },
      });
    });

    it('should register new user and return access token', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockPrismaService.user.create.mockResolvedValue({
        id: 1,
        email: mockRegisterDto.email,
        role: mockRegisterDto.role,
      });
      mockJwtService.sign.mockReturnValue('signed-token');

      const result = await service.register(mockRegisterDto);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...mockRegisterDto,
          password: 'hashedPassword',
        },
      });
      expect(result).toEqual({ accessToken: 'signed-token', tokenType: 'Bearer' });
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        new UnauthorizedException(AuthError.INVALID_CREDENTIALS),
      );
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ password: 'hashed-password' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        new UnauthorizedException(AuthError.INVALID_CREDENTIALS),
      );
    });

    it('should return access token if login successful', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        email: mockLoginDto.email,
        role: 'USER',
        password: 'hashed-password',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('signed-token');

      const result = await service.login(mockLoginDto);

      expect(result).toEqual({ accessToken: 'signed-token', tokenType: 'Bearer' });
    });
  });
});
