// src/account/account.service.ts

import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './DTO/create-product.dto';
import { IAccount } from './account.interface';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async create(dto: CreateAccountDto): Promise<IAccount> {
    try {
      const account = this.accountRepo.create(dto);
      const saved = await this.accountRepo.save(account);
      return saved as IAccount;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create account');
    }
  }

  async findAll(): Promise<IAccount[]> {
    const accounts = await this.accountRepo.find();
    return accounts as IAccount[];
  }

  async findOne(id: number): Promise<IAccount> {
    const account = await this.accountRepo.findOne({ where: { id } });
    if (!account) throw new NotFoundException(`Account ID ${id} not found`);
    return account as IAccount;
  }

  async delete(id: number): Promise<void> {
    const result = await this.accountRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Account ID ${id} not found`);
    }
  }
}
