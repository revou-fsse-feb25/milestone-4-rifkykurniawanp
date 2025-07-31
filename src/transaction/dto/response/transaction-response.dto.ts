import { Expose, Transform, Type } from 'class-transformer';
import { TransactionStatus, TransactionType, AccountStatus, AccountType } from '@prisma/client';
import { formatWIBDateTime } from 'src/common/utils/date-utils';
import { safeDecimalToNumber } from 'src/common/utils/number-utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseTransactionResponseDto {
  @ApiProperty({
    description: 'ID unik transaksi',
    example: 1,
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: 'Nominal transaksi',
    example: 150000.50,
    type: Number,
  })
  @Expose()
  @Transform(({ value, key, obj }) => {
    console.log(`[TransactionDTO] Transforming ${key}:`, value, 'from object:', obj);
    return safeDecimalToNumber(value);
  })
  amount: number;

  @ApiProperty({
    description: 'Jenis transaksi',
    enum: TransactionType,
  })
  @Expose()
  type: TransactionType;

  @ApiPropertyOptional({
    description: 'Kategori transaksi',
    example: 'Makanan',
    type: String,
  })
  @Expose()
  @Type(() => String)
  category?: string;

  @ApiPropertyOptional({
    description: 'Deskripsi transaksi',
    example: 'Pembelian makan siang di restoran',
    type: String,
  })
  @Expose()
  @Type(() => String)
  description?: string;

  @ApiPropertyOptional({
    description: 'Referensi transaksi',
    example: 'TRX-2024-001',
    type: String,
  })
  @Expose()
  @Type(() => String)
  reference?: string;

  @ApiProperty({
    description: 'Status transaksi',
    enum: TransactionStatus,
  })
  @Expose()
  status: TransactionStatus;

  @ApiPropertyOptional({
    description: 'ID akun sumber',
    example: 1,
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  fromAccountId?: number;

  @ApiPropertyOptional({
    description: 'ID akun tujuan',
    example: 2,
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  toAccountId?: number;

  @ApiProperty({
    description: 'Tanggal dan waktu pembuatan transaksi (WIB)',
    example: '2024-01-15 10:30:00 WIB',
    type: String,
  })
  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  createdAt: string;

  @ApiProperty({
    description: 'Tanggal dan waktu terakhir update transaksi (WIB)',
    example: '2024-01-15 14:25:00 WIB',
    type: String,
  })
  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  updatedAt: string;
}

export class BaseAccountResponseDto {
  @ApiProperty({
    description: 'ID unik akun',
    example: 1,
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: 'Nama akun',
    example: 'Rekening Tabungan BCA',
    type: String,
  })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    description: 'Jenis akun',
    enum: AccountType,
  })
  @Expose()
  type: AccountType;

  @ApiProperty({
    description: 'Status akun',
    enum: AccountStatus,
  })
  @Expose()
  status: AccountStatus;

  @ApiProperty({
    description: 'Saldo akun',
    example: 2500000.75,
    type: Number,
  })
  @Expose()
  @Transform(({ value, key, obj }) => {
    console.log(`[AccountDTO] Transforming ${key}:`, value, 'from object:', obj);
    return safeDecimalToNumber(value);
  })
  balance: number;

  @ApiProperty({
    description: 'Mata uang akun',
    example: 'IDR',
    type: String,
  })
  @Expose()
  @Type(() => String)
  currency: string;

  @ApiProperty({
    description: 'ID pemilik akun',
    example: 1,
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  userId: number;

  @ApiProperty({
    description: 'Tanggal dan waktu pembuatan akun (WIB)',
    example: '2024-01-10 09:00:00 WIB',
    type: String,
  })
  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  createdAt: string;

  @ApiProperty({
    description: 'Tanggal dan waktu terakhir update akun (WIB)',
    example: '2024-01-15 16:45:00 WIB',
    type: String,
  })
  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  updatedAt: string;
}

export class CreateTransactionResponseDto extends BaseTransactionResponseDto {
  // Inherits all properties from BaseTransactionResponseDto
  // Swagger documentation is automatically inherited
}

export class TransactionResponseDto extends BaseTransactionResponseDto {
  // Inherits all properties from BaseTransactionResponseDto
  // Swagger documentation is automatically inherited
}

export class CreateAccountResponseDto extends BaseAccountResponseDto {
  // Inherits all properties from BaseAccountResponseDto
  // Swagger documentation is automatically inherited
}

export class AccountResponseDto extends BaseAccountResponseDto {
  // Inherits all properties from BaseAccountResponseDto
  // Swagger documentation is automatically inherited
}