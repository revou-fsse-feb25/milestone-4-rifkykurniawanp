import { Controller, Get, Post, Patch, Body, Delete } from '@nestjs/common';
import { accounts } from './account.data';
import { NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto} from './DTO/create-product.dto';
import { UpdateProductDto } from './DTO/update-product.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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

  @Post()
  createAccount(@Body() CreateProductDto: CreateProductDto) {
    return {
      message: 'Account created successfully',
      data: CreateProductDto,
    };
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