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

export class CreateTransactionDto {
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'Amount must be a valid number with up to 2 decimal places' },
  )
  @IsPositive({ message: 'Amount must be greater than zero' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @IsEnum(TransactionType, { message: 'Invalid transaction type' })
  @IsNotEmpty({ message: 'Transaction type is required' })
  type: TransactionType;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Category must not exceed 50 characters' })
  category?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'Description must not exceed 255 characters' })
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'Reference must not exceed 100 characters' })
  reference?: string;

  @IsEnum(TransactionStatus, { message: 'Invalid transaction status' })
  @IsOptional()
  status?: TransactionStatus;

  @IsNumber({}, { message: 'fromAccountId must be a number' })
  @IsOptional()
  fromAccountId?: number;

  @IsNumber({}, { message: 'toAccountId must be a number' })
  @IsOptional()
  toAccountId?: number;
}
