import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './interface/users.interface';
import { UserCreateDto } from './dto/request/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: UserCreateDto): Promise<IUser> {
    return await this.prisma.user.create({ data: dto });
  }

  async findAll(): Promise<IUser[]> {
    return this.prisma.user.findMany({
      include: {
        accounts: true // Include related accounts
      }
    });
  }

  async findOne(id: number): Promise<IUser> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      include: {
        accounts: {
          include: {
            transactions: true
          }
        }
      }
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async delete(id: number): Promise<void> {
    // Check if user exists
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
  }
}