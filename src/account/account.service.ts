<<<<<<< HEAD
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
=======
import { Injectable } from '@nestjs/common';
import { accounts } from './account.data';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './DTO/create-product.dto';
import { UpdateProductDto } from './DTO/update-product.dto';

@Injectable()
export class AccountService {
  updateAccount(id: number, updateDto: UpdateProductDto) {
    const accountIndex = accounts.findIndex((acc) => acc.id === id);
    if (accountIndex === -1) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    accounts[accountIndex] = { ...accounts[accountIndex], ...updateDto };
    return {
      message: 'Account updated successfully',
      data: accounts[accountIndex],
    };
  }

  deleteAccount(id: number) {
    const accountIndex = accounts.findIndex((acc) => acc.id === id);
    if (accountIndex === -1) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    accounts.splice(accountIndex, 1);
    return {
      message: 'Account deleted successfully',
    };
  }
}
>>>>>>> b4832aed2944d7f6fa39ead25a774db809010ed0
