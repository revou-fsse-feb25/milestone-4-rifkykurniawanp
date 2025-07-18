// src/account/account.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './DTO/create-product.dto';
import { IAccount } from './account.interface';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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
}
