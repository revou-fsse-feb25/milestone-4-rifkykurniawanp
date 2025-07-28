import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUsersRepository } from './interface/users.repository.interface';
import {
  mockAdminUser,
  mockRegularUser,
} from '../../test/mocks/users.mock';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CreateUserDto } from './dto/request/create-user.dto';

const mockUsersRepository: IUsersRepository = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'IUsersRepository',
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const createUserDto: CreateUserDto = {
      name: 'Created User',
      email: 'created@example.com',
      password: 'hashedPassword',
    };

    it('should create a user with default role and isActive', async () => {
      const expectedUser = { ...mockRegularUser, ...createUserDto };
      (mockUsersRepository.create as jest.Mock).mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(expectedUser);
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        role: UserRole.USER,
        isActive: true,
      });
    });
  });

  describe('findAll()', () => {
    it('should return all users', async () => {
      (mockUsersRepository.findAll as jest.Mock).mockResolvedValue([
        mockAdminUser,
        mockRegularUser,
      ]);

      const result = await service.findAll();

      expect(result).toEqual([mockAdminUser, mockRegularUser]);
    });
  });

  describe('findOne()', () => {
    it('should return a user by ID', async () => {
      (mockUsersRepository.findOne as jest.Mock).mockResolvedValue(mockAdminUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockAdminUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      (mockUsersRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    it('should update a user successfully', async () => {
      const updateDto = { name: 'Updated Name' };
      const updatedUser = { ...mockAdminUser, ...updateDto };
      (mockUsersRepository.findOne as jest.Mock).mockResolvedValue(mockAdminUser);
      (mockUsersRepository.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(updatedUser);
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockUsersRepository.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      (mockUsersRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.update(999, { name: 'Invalid' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete()', () => {
    it('should delete a user after checking existence', async () => {
      (mockUsersRepository.findOne as jest.Mock).mockResolvedValue(mockAdminUser);
      (mockUsersRepository.remove as jest.Mock).mockResolvedValue(true);

      await expect(service.delete(1)).resolves.toBeUndefined();
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith(1);
      expect(mockUsersRepository.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      (mockUsersRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.delete(99)).rejects.toThrow(NotFoundException);
    });
  });
});
