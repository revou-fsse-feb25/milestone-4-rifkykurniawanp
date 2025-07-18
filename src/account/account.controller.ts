<<<<<<< HEAD
// src/account/account.controller.ts
=======
import { Controller, Get, Post, Patch, Body, Delete } from '@nestjs/common';
import { accounts } from './account.data';
import { NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto} from './DTO/create-product.dto';
import { UpdateProductDto } from './DTO/update-product.dto';
import { AccountService } from './account.service';
>>>>>>> b4832aed2944d7f6fa39ead25a774db809010ed0

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './DTO/create-product.dto';
import { IAccount } from './account.interface';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
<<<<<<< HEAD
=======

  @Get()
  getAllAccounts() {
    return accounts;
  }
  @Get(':id')
  getAccountById(@Param('id', ParseIntPipe) id: number) {
    const account = accounts.find((acc) => acc.id === id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }
>>>>>>> b4832aed2944d7f6fa39ead25a774db809010ed0

  @Post()
  create(@Body() dto: CreateAccountDto): Promise<IAccount> {
    return this.accountService.create(dto);
  }

  @Get()
  findAll(): Promise<IAccount[]> {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IAccount> {
    return this.accountService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.accountService.delete(+id);
  }

  @Patch(':id')
updateAccount(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateProductDto: UpdateProductDto,
) {
  return this.accountService.updateAccount(id, updateProductDto);
}

@Delete(':id')
deleteAccount(@Param('id', ParseIntPipe) id: number) {
  return this.accountService.deleteAccount(id);
}
}