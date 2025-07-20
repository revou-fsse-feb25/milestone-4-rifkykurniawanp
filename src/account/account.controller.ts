import {
  Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors,
  ParseIntPipe
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/request/create-account.dto';
import { UpdateAccountDto } from './dto/request/update-account.dto';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptor';
import { AccountResponseDto } from './dto/response/account-response.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UseInterceptors(new SerializationInterceptor(AccountResponseDto))
  create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }

  @Get()
  @UseInterceptors(new SerializationInterceptor(AccountResponseDto))
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @UseInterceptors(new SerializationInterceptor(AccountResponseDto))
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(new SerializationInterceptor(AccountResponseDto))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAccountDto) {
    return this.accountService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.remove(id);
  }
}
