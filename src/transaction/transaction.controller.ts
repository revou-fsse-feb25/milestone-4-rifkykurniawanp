import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/request/create-transaction.dto';
import { UpdateTransactionDto } from './dto/request/upate-transaction.dto';
import {
  TransactionResponseDto,
  CreateTransactionResponseDto,
} from './dto/response/transaction-response.dto';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptor';
import { AuthGuardRoles } from 'src/auth/decorator/auth.decorator';
import { UserRole } from '@prisma/client';

@Controller('transactions')
@AuthGuardRoles(UserRole.USER, UserRole.ADMIN)
@UseInterceptors(new SerializationInterceptor(TransactionResponseDto))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseInterceptors(new SerializationInterceptor(CreateTransactionResponseDto))
  async create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  @AuthGuardRoles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, dto);
  }

  @Delete(':id')
  @AuthGuardRoles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.transactionService.remove(id);
    if (!result) throw new NotFoundException(`Transaction with ID ${id} not found`);
    return { success: true };
  }
}
