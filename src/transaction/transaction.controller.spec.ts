import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/request/create-transaction.dto';
import { UpdateTransactionDto } from './dto/request/upate-transaction.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { mockTransactionList, createTransactionDto, updateTransactionDto } from '../../test/mocks/transactions.mock';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  const mockTransactionService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const expectedResult = { id: 123, ...createTransactionDto };

    it('should create a new transaction successfully', async () => {
      mockTransactionService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createTransactionDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createTransactionDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors during creation', async () => {
      const error = new BadRequestException('Invalid transaction data');
      mockTransactionService.create.mockRejectedValue(error);

      await expect(controller.create(createTransactionDto))
        .rejects.toThrow(BadRequestException);
      
      expect(service.create).toHaveBeenCalledWith(createTransactionDto);
    });
  });

  describe('findAll()', () => {
    it('should return a list of transactions', async () => {
      mockTransactionService.findAll.mockResolvedValue(mockTransactionList);

      const result = await controller.findAll();

      expect(result).toEqual(mockTransactionList);
      expect(result).toHaveLength(mockTransactionList.length);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no transactions exist', async () => {
      mockTransactionService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne()', () => {
    const transactionId = 1;
    const expectedTransaction = mockTransactionList[0];

    it('should return a transaction by id', async () => {
      mockTransactionService.findOne.mockResolvedValue(expectedTransaction);

      const result = await controller.findOne(transactionId);

      expect(result).toEqual(expectedTransaction);
      expect(service.findOne).toHaveBeenCalledWith(transactionId);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when transaction not found', async () => {
      const notFoundError = new NotFoundException(`Transaction with ID ${transactionId} not found`);
      mockTransactionService.findOne.mockRejectedValue(notFoundError);

      await expect(controller.findOne(transactionId))
        .rejects.toThrow(NotFoundException);
      
      expect(service.findOne).toHaveBeenCalledWith(transactionId);
    });

    it('should handle invalid id parameter', async () => {
      const invalidId = -1;
      const error = new BadRequestException('Invalid transaction ID');
      mockTransactionService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(invalidId))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('update()', () => {
    const transactionId = 1;
    const expectedResult = { ...mockTransactionList[0], ...updateTransactionDto };

    it('should update a transaction successfully', async () => {
      mockTransactionService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(transactionId, updateTransactionDto);

      expect(result).toEqual(expectedResult);
      expect(result).toHaveProperty('status', updateTransactionDto.status);
      expect(service.update).toHaveBeenCalledWith(transactionId, updateTransactionDto);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent transaction', async () => {
      const notFoundError = new NotFoundException(`Transaction with ID ${transactionId} not found`);
      mockTransactionService.update.mockRejectedValue(notFoundError);

      await expect(controller.update(transactionId, updateTransactionDto))
        .rejects.toThrow(NotFoundException);
      
      expect(service.update).toHaveBeenCalledWith(transactionId, updateTransactionDto);
    });

    it('should handle validation errors during update', async () => {
      const validationError = new BadRequestException('Invalid update data');
      mockTransactionService.update.mockRejectedValue(validationError);

      await expect(controller.update(transactionId, updateTransactionDto))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('remove()', () => {
    const transactionId = 1;

    it('should delete a transaction successfully', async () => {
      // Assuming your controller returns { success: true } for successful deletion
      mockTransactionService.remove.mockResolvedValue(true);

      const result = await controller.remove(transactionId);

      expect(result).toEqual({ success: true });
      expect(service.remove).toHaveBeenCalledWith(transactionId);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent transaction', async () => {
      const notFoundError = new NotFoundException(`Transaction with ID ${transactionId} not found`);
      mockTransactionService.remove.mockRejectedValue(notFoundError);

      await expect(controller.remove(transactionId))
        .rejects.toThrow(NotFoundException);
      
      expect(service.remove).toHaveBeenCalledWith(transactionId);
    });

    it('should handle database errors during deletion', async () => {
      const dbError = new Error('Database connection failed');
      mockTransactionService.remove.mockRejectedValue(dbError);

      await expect(controller.remove(transactionId))
        .rejects.toThrow('Database connection failed');
    });
  });

  describe('Integration scenarios', () => {
    it('should handle multiple operations correctly', async () => {
      // Test that multiple calls work independently
      mockTransactionService.findAll.mockResolvedValue(mockTransactionList);
      mockTransactionService.findOne.mockResolvedValue(mockTransactionList[0]);

      const allTransactions = await controller.findAll();
      const singleTransaction = await controller.findOne(1);

      expect(allTransactions).toHaveLength(mockTransactionList.length);
      expect(singleTransaction).toEqual(mockTransactionList[0]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });
});