import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/request/create-account.dto';
import { UpdateAccountDto } from './dto/request/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async create(dto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepo.create(dto);
    return await this.accountRepo.save(account);
  }

  async findAll(): Promise<Account[]> {
    return await this.accountRepo.find({ relations: ['user'] }); // optional
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepo.findOne({ where: { id } });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async update(id: number, dto: UpdateAccountDto): Promise<Account> {
    const account = await this.findOne(id);
    const updated = Object.assign(account, dto);
    return await this.accountRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.accountRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Account not found');
  }
}
