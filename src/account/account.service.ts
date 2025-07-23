import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IAccountsRepository } from './interface/account.repository.interface';
import { Account } from '@prisma/client';
import { CreateAccountDto } from './dto/request/create-account.dto';
import { UpdateAccountDto } from './dto/request/update-account.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class AccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountsRepository,
  ) {}

  async create(dto: CreateAccountDto): Promise<Account> {
    const preparedDto = {
      ...dto,
      balance: dto.balance !== undefined ? new Decimal(dto.balance) : undefined,
    };
    return this.accountRepository.create(preparedDto);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne(id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async update(id: number, dto: UpdateAccountDto): Promise<Account> {
    await this.findOne(id); // Pastikan akun ada

    const preparedDto = {
      ...dto,
      balance: dto.balance !== undefined ? new Decimal(dto.balance) : undefined,
    };

    const updated = await this.accountRepository.update(id, preparedDto);
    if (!updated) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const existing = await this.accountRepository.findOne(id);
    if (!existing) return false;
    return this.accountRepository.remove(id);
  }
}
