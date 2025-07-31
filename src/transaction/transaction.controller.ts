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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
@AuthGuardRoles(UserRole.USER, UserRole.ADMIN)
@UseInterceptors(new SerializationInterceptor(TransactionResponseDto))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat transaksi baru' })
  @ApiResponse({
    status: 201,
    description: 'Transaksi berhasil dibuat',
    type: CreateTransactionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Input tidak valid',
  })
  @ApiResponse({
    status: 401,
    description: 'Tidak terotorisasi',
  })
  @UseInterceptors(new SerializationInterceptor(CreateTransactionResponseDto))
  async create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Menampilkan semua transaksi' })
  @ApiResponse({
    status: 200,
    description: 'Daftar semua transaksi',
    type: [TransactionResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Tidak terotorisasi',
  })
  async findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil detail transaksi berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID transaksi' })
  @ApiResponse({
    status: 200,
    description: 'Detail transaksi ditemukan',
    type: TransactionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Transaksi tidak ditemukan',
  })
  @ApiResponse({
    status: 401,
    description: 'Tidak terotorisasi',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui data transaksi berdasarkan ID (Admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID transaksi' })
  @ApiResponse({
    status: 200,
    description: 'Transaksi berhasil diperbarui',
    type: TransactionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Transaksi tidak ditemukan',
  })
  @ApiResponse({
    status: 401,
    description: 'Tidak terotorisasi',
  })
  @ApiResponse({
    status: 403,
    description: 'Akses ditolak - hanya admin yang dapat mengupdate transaksi',
  })
  @AuthGuardRoles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus transaksi berdasarkan ID (Admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID transaksi' })
  @ApiResponse({
    status: 200,
    description: 'Transaksi berhasil dihapus',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Transaksi tidak ditemukan',
  })
  @ApiResponse({
    status: 401,
    description: 'Tidak terotorisasi',
  })
  @ApiResponse({
    status: 403,
    description: 'Akses ditolak - hanya admin yang dapat menghapus transaksi',
  })
  @AuthGuardRoles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.transactionService.remove(id);
    if (!result) throw new NotFoundException(`Transaction with ID ${id} not found`);
    return { success: true };
  }
}