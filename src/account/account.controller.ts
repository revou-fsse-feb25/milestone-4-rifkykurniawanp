import { Controller, Get } from '@nestjs/common';
import { accounts } from './account.data';
import { NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

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

    }
