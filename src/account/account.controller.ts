import { Controller, Get, Post, Body } from '@nestjs/common';
import { accounts } from './account.data';
import { NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto } from './DTO/create-product.dto';

@Controller('account')
export class AccountController {
    @Get()
    getAllAccounts() {
        return accounts;
    }
    @Get(':id')
getAccountById(@Param('id', ParseIntPipe) id: number) {
  const account = accounts.find(acc => acc.id === id);
  if (!account) {
    throw new NotFoundException(`Account with ID ${id} not found`);
  }
  return account;
}

    @Post()
    createAccount(@Body() CreateProductDto: CreateProductDto) {
        return {
            message: 'Account created successfully',
            data: CreateProductDto
        };

    }
  }