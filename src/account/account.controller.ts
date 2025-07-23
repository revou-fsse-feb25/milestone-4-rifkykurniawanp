import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/request/create-account.dto';
import { UpdateAccountDto } from './dto/request/update-account.dto';
import {
  AccountResponseDto,
  CreateAccountResponseDto,
} from './dto/response/account-response.dto';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptor';

@Controller('accounts')
@UseInterceptors(new SerializationInterceptor(AccountResponseDto)) // Default untuk semua
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UseInterceptors(new SerializationInterceptor(CreateAccountResponseDto))
  async create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }

  @Get()
  async findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAccountDto,
  ) {
    return this.accountService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.accountService.remove(id);
    if (!result) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return { success: true };
  }
}
