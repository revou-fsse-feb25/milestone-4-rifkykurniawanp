import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { TransactionType, TransactionStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Nominal transaksi (maksimal 2 digit desimal)',
    example: 150000.50,
    type: Number,
    minimum: 0.01,
  })
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'Amount must be a valid number with up to 2 decimal places' },
  )
  @IsPositive({ message: 'Amount must be greater than zero' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @ApiProperty({
    description: 'Jenis transaksi',
    enum: TransactionType,
  })
  @IsEnum(TransactionType, { message: 'Invalid transaction type' })
  @IsNotEmpty({ message: 'Transaction type is required' })
  type: TransactionType;

  @ApiPropertyOptional({
    description: 'Kategori transaksi (maksimal 50 karakter)',
    example: 'Makanan',
    type: String,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Category must not exceed 50 characters' })
  category?: string;

  @ApiPropertyOptional({
    description: 'Deskripsi transaksi (maksimal 255 karakter)',
    example: 'Pembelian makan siang di restoran',
    type: String,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'Description must not exceed 255 characters' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Referensi transaksi (maksimal 100 karakter)',
    example: 'TRX-2024-001',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'Reference must not exceed 100 characters' })
  reference?: string;

  @ApiPropertyOptional({
    description: 'Status transaksi',
    enum: TransactionStatus,
  })
  @IsEnum(TransactionStatus, { message: 'Invalid transaction status' })
  @IsOptional()
  status?: TransactionStatus;

  @ApiPropertyOptional({
    description: 'ID akun sumber (untuk transfer)',
    example: 1,
    type: Number,
  })
  @IsNumber({}, { message: 'fromAccountId must be a number' })
  @IsOptional()
  fromAccountId?: number;

  @ApiPropertyOptional({
    description: 'ID akun tujuan (untuk transfer)',
    example: 2,
    type: Number,
  })
  @IsNumber({}, { message: 'toAccountId must be a number' })
  @IsOptional()
  toAccountId?: number;
}