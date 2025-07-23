import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUsersRepository } from './interface/users.repository.interface';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const role = dto.role ?? UserRole.USER;

    return this.usersRepository.create({
      ...dto,
      role,
      isActive: dto.isActive ?? true,
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.remove(id);
  }
}
