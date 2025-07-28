import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import {
  mockRegisterDto,
  mockLoginDto,
  mockAuthService,
  mockJwtService,
  mockPrismaService,
} from '../../test/mocks/auth.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.register when register is called', async () => {
    const expectedResult = {
      accessToken: 'mocked-jwt-token',
      tokenType: 'Bearer',
    };

    mockAuthService.register.mockResolvedValue(expectedResult);

    const result = await controller.register(mockRegisterDto);

    expect(authService.register).toHaveBeenCalledWith(mockRegisterDto);
    expect(result).toEqual(expectedResult);
  });

  it('should call authService.login when login is called', async () => {
    const expectedResult = {
      accessToken: 'mocked-jwt-token',
      tokenType: 'Bearer',
    };

    mockAuthService.login.mockResolvedValue(expectedResult);

    const result = await controller.login(mockLoginDto);

    expect(authService.login).toHaveBeenCalledWith(mockLoginDto);
    expect(result).toEqual(expectedResult);
  });
});
