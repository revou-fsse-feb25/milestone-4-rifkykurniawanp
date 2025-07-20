import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IUser } from './interface/users.interface';
import { IUsersRepository } from './interface/users.repository.interface';
import { CreateUserDto } from './dto/request/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

 async create(dto: CreateUserDto): Promise<IUser> {
  return this.usersRepository.create({
    ...dto,
    isActive: true,
  });
}


  async findAll(): Promise<IUser[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<IUser> {
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
