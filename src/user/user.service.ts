import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserCreateDto } from './DTO/req/user-create.dto';
import { IUser } from './interface/users.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: UserCreateDto): Promise<IUser> {
    const user = this.userRepo.create(dto);
    return await this.userRepo.save(user);
  }

  async findAll(): Promise<IUser[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<IUser> {
  const user = await this.userRepo.findOne({ where: { id } });

  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  return user;
}

  async delete(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
