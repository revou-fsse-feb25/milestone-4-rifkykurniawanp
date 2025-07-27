import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { mockTransactionRepository, createTransactionDto, updateTransactionDto } from '../../test/mocks/transactions.mock';
import { Decimal } from '@prisma/client/runtime/library';
import { NotFoundException } from '@nestjs/common';
import { ITransactionsRepository } from './interface/transaction.repository.interface';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: 'TransactionRepository',
          useValue: mockTransactionRepository,
        },
        {
          provide: PrismaService,
          useValue: {
            account: {
              findFirst: jest.fn().mockResolvedValue({
                id: 1,
                balance: new Decimal(1000.00),
              }),
            },
            transaction: {
              findFirst: jest.fn().mockResolvedValue({
                id: 1,
                amount: new Decimal(2000.00),
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a transaction with Decimal amount', async () => {
      const result = await service.create(createTransactionDto);
      expect(result).toHaveProperty('id');
      expect(result.amount).toBeInstanceOf(Decimal);
      expect(result.type).toBe(createTransactionDto.type);
    });
  });

  describe('findAll', () => {
    it('should return all transactions', async () => {
      const result = await service.findAll();
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a transaction if exists', async () => {
      const result = await service.findOne(1);
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
    });

    it('should throw NotFoundException if not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a transaction if found', async () => {
      const result = await service.update(1, updateTransactionDto);
      expect(result).toBeDefined();
      expect(result.status).toBe(updateTransactionDto.status);
    });

    it('should throw NotFoundException if transaction not found', async () => {
      await expect(service.update(999, updateTransactionDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should return true if transaction found and removed', async () => {
      const result = await service.remove(1);
      expect(result).toBe(true);
    });

    it('should return false if transaction not found', async () => {
      const result = await service.remove(999);
      expect(result).toBe(false);
    });
  });

  describe('testDecimalFields', () => {
    it('should log decimal fields (manually observable)', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      await service.testDecimalFields();
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('=== TESTING DECIMAL FIELDS ==='));
      consoleSpy.mockRestore();
    });
  });
});
