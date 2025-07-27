import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/request/create-transaction.dto';
import { UpdateTransactionDto } from './dto/request/upate-transaction.dto';
import { NotFoundException } from '@nestjs/common';
import { mockTransactionList, createTransactionDto, updateTransactionDto } from '../../test/mocks/transactions.mock';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  const mockTransactionService = {
    create: jest.fn().mockResolvedValue({ id: 123, ...createTransactionDto }),
    findAll: jest.fn().mockResolvedValue(mockTransactionList),
    findOne: jest.fn().mockImplementation((id: number) => {
      const found = mockTransactionList.find(tx => tx.id === id);
      if (!found) throw new NotFoundException(`Transaction with ID ${id} not found`);
      return Promise.resolve(found);
    }),
    update: jest.fn().mockImplementation((id: number, dto: UpdateTransactionDto) => {
      const found = mockTransactionList.find(tx => tx.id === id);
      if (!found) throw new NotFoundException(`Transaction with ID ${id} not found`);
      return Promise.resolve({ ...found, ...dto });
    }),
    remove: jest.fn().mockImplementation((id: number) => {
      const exists = mockTransactionList.find(tx => tx.id === id);
      return Promise.resolve(!!exists);
    }),
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new transaction', async () => {
      const result = await controller.create(createTransactionDto);
      expect(result).toHaveProperty('id');
      expect(service.create).toHaveBeenCalledWith(createTransactionDto);
    });
  });

  describe('findAll()', () => {
    it('should return a list of transactions', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(mockTransactionList);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a transaction by id', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockTransactionList[0]);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if not found', async () => {
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    it('should update a transaction', async () => {
      const result = await controller.update(1, updateTransactionDto);
      expect(result).toHaveProperty('status', updateTransactionDto.status);
      expect(service.update).toHaveBeenCalledWith(1, updateTransactionDto);
    });

    it('should throw NotFoundException if update fails', async () => {
      await expect(controller.update(999, updateTransactionDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should return success true if deleted', async () => {
      const result = await controller.remove(1);
      expect(result).toEqual({ success: true });
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if transaction not found', async () => {
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
