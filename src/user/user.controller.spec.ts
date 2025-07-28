import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import {
  mockAdminUser,
  mockRegularUser,
} from '../../test/mocks/users.mock';
import { CreateUserDto } from './dto/request/create-user.dto';

const mockUserService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: undefined,
      isActive: undefined,
    };

    it('should create a new user successfully', async () => {
      mockUserService.create.mockResolvedValue(mockRegularUser);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(mockRegularUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle errors during user creation', async () => {
      mockUserService.create.mockRejectedValue(
        new BadRequestException('Invalid user data'),
      );

      await expect(controller.create(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll()', () => {
    it('should return a list of users', async () => {
      mockUserService.findAll.mockResolvedValue([mockAdminUser, mockRegularUser]);

      const result = await controller.findAll();

      expect(result).toEqual([mockAdminUser, mockRegularUser]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a user by ID', async () => {
      mockUserService.findOne.mockResolvedValue(mockAdminUser);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockAdminUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUserService.findOne.mockRejectedValue(
        new NotFoundException('User with id 1 not found'),
      );

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
