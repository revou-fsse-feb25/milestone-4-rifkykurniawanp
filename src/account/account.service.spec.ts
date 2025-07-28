// src/account/account.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { IAccountsRepository } from './interface/account.repository.interface';
import { Decimal } from '@prisma/client/runtime/library';

describe('AccountService', () => {
  let service: AccountService;
  let prismaService: PrismaService;
  let accountRepository: IAccountsRepository;

  const mockAccountRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPrismaService = {
    account: {
      findFirst: jest.fn(),
    },
    transaction: {
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: 'AccountRepository',
          useValue: mockAccountRepository,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    prismaService = module.get<PrismaService>(PrismaService);
    accountRepository = module.get<IAccountsRepository>('AccountRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new account', async () => {
      const createAccountDto = {
        name: 'Test Account',
        type: 'SAVINGS' as any,
        balance: 1000,
        userId: 1,
      };

      const createdAccount = {
        id: 1,
        name: 'Test Account',
        type: 'SAVINGS',
        balance: new Decimal(1000),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAccountRepository.create.mockResolvedValue(createdAccount);

      const result = await service.create(createAccountDto);

      expect(result).toEqual(createdAccount);
      expect(mockAccountRepository.create).toHaveBeenCalledWith({
        ...createAccountDto,
        balance: expect.any(Decimal),
      });
    });

    it('should handle undefined balance', async () => {
      const createAccountDto = {
        name: 'Test Account',
        type: 'SAVINGS' as any,
        userId: 1,
      };

      const createdAccount = {
        id: 1,
        name: 'Test Account',
        type: 'SAVINGS',
        balance: new Decimal(0),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAccountRepository.create.mockResolvedValue(createdAccount);

      const result = await service.create(createAccountDto);

      expect(result).toEqual(createdAccount);
      expect(mockAccountRepository.create).toHaveBeenCalledWith({
        ...createAccountDto,
        balance: undefined,
      });
    });
  });

  describe('findAll', () => {
    it('should return all accounts', async () => {
      const accounts = [
        { 
          id: 1, 
          name: 'Account 1', 
          type: 'SAVINGS', 
          balance: new Decimal(1000), 
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          id: 2, 
          name: 'Account 2', 
          type: 'CHECKING', 
          balance: new Decimal(500), 
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockAccountRepository.findAll.mockResolvedValue(accounts);

      const result = await service.findAll();

      expect(result).toEqual(accounts);
      expect(mockAccountRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific account', async () => {
      const accountId = 1;
      const account = { 
        id: accountId, 
        name: 'Test Account', 
        type: 'SAVINGS', 
        balance: new Decimal(1000), 
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAccountRepository.findOne.mockResolvedValue(account);

      const result = await service.findOne(accountId);

      expect(result).toEqual(account);
      expect(mockAccountRepository.findOne).toHaveBeenCalledWith(accountId);
    });

    it('should throw NotFoundException if account not found', async () => {
      const accountId = 999;

      mockAccountRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(accountId)).rejects.toThrow(
        new NotFoundException(`Account with ID ${accountId} not found`)
      );
    });
  });

  describe('update', () => {
    it('should update an existing account', async () => {
      const accountId = 1;
      const updateAccountDto = { name: 'Updated Account', balance: 1500 };
      const existingAccount = { 
        id: accountId, 
        name: 'Test Account', 
        type: 'SAVINGS', 
        balance: new Decimal(1000), 
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedAccount = { 
        ...existingAccount, 
        name: 'Updated Account', 
        balance: new Decimal(1500) 
      };

      mockAccountRepository.findOne.mockResolvedValue(existingAccount);
      mockAccountRepository.update.mockResolvedValue(updatedAccount);

      const result = await service.update(accountId, updateAccountDto);

      expect(result).toEqual(updatedAccount);
      expect(mockAccountRepository.findOne).toHaveBeenCalledWith(accountId);
      expect(mockAccountRepository.update).toHaveBeenCalledWith(accountId, {
        ...updateAccountDto,
        balance: expect.any(Decimal),
      });
    });

    it('should throw NotFoundException if account not found during update', async () => {
      const accountId = 999;
      const updateAccountDto = { name: 'Updated Account' };

      mockAccountRepository.findOne.mockResolvedValue(null);

      await expect(service.update(accountId, updateAccountDto)).rejects.toThrow(
        new NotFoundException(`Account with ID ${accountId} not found`)
      );
    });

    it('should throw NotFoundException if update returns null', async () => {
      const accountId = 1;
      const updateAccountDto = { name: 'Updated Account' };
      const existingAccount = { 
        id: accountId, 
        name: 'Test Account', 
        type: 'SAVINGS', 
        balance: new Decimal(1000), 
        userId: 1 
      };

      mockAccountRepository.findOne.mockResolvedValue(existingAccount);
      mockAccountRepository.update.mockResolvedValue(null);

      await expect(service.update(accountId, updateAccountDto)).rejects.toThrow(
        new NotFoundException(`Account with ID ${accountId} not found`)
      );
    });
  });

  describe('remove', () => {
    it('should delete an account successfully', async () => {
      const accountId = 1;
      const existingAccount = { 
        id: accountId, 
        name: 'Test Account', 
        type: 'SAVINGS', 
        balance: new Decimal(1000), 
        userId: 1 
      };

      mockAccountRepository.findOne.mockResolvedValue(existingAccount);
      mockAccountRepository.remove.mockResolvedValue(true);

      const result = await service.remove(accountId);

      expect(result).toBe(true);
      expect(mockAccountRepository.findOne).toHaveBeenCalledWith(accountId);
      expect(mockAccountRepository.remove).toHaveBeenCalledWith(accountId);
    });

    it('should return false if account not found', async () => {
      const accountId = 999;

      mockAccountRepository.findOne.mockResolvedValue(null);

      const result = await service.remove(accountId);

      expect(result).toBe(false);
      expect(mockAccountRepository.findOne).toHaveBeenCalledWith(accountId);
      expect(mockAccountRepository.remove).not.toHaveBeenCalled();
    });
  });

  describe('testDecimalFields', () => {
    it('should test decimal fields and log results', async () => {
      const mockAccount = {
        id: 1,
        name: 'Test Account',
        balance: new Decimal(1000),
      };
      const mockTransaction = {
        id: 1,
        amount: new Decimal(500),
      };

      mockPrismaService.account.findFirst.mockResolvedValue(mockAccount);
      mockPrismaService.transaction.findFirst.mockResolvedValue(mockTransaction);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await service.testDecimalFields();

      expect(mockPrismaService.account.findFirst).toHaveBeenCalled();
      expect(mockPrismaService.transaction.findFirst).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('=== TESTING DECIMAL FIELDS ===');
      expect(consoleSpy).toHaveBeenCalledWith('=== END TEST ===');

      consoleSpy.mockRestore();
    });
  });

  describe('toOptionalDecimal private method', () => {
    it('should handle number conversion', () => {
      // Access private method for testing
      const result = (service as any).toOptionalDecimal(1000);
      expect(result).toBeInstanceOf(Decimal);
      expect(result.toString()).toBe('1000');
    });

    it('should handle Decimal input', () => {
      const decimal = new Decimal(1000);
      const result = (service as any).toOptionalDecimal(decimal);
      expect(result).toBe(decimal);
    });

    it('should handle null input', () => {
      const result = (service as any).toOptionalDecimal(null);
      expect(result).toBeUndefined();
    });

    it('should handle undefined input', () => {
      const result = (service as any).toOptionalDecimal(undefined);
      expect(result).toBeUndefined();
    });
  });
});