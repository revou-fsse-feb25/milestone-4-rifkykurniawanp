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