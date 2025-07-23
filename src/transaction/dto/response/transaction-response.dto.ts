import { Expose, Transform, Type } from 'class-transformer';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { formatWIBDateTime } from 'src/common/utils';

export class BaseTransactionResponseDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  amount: number;

  @Expose()
  type: TransactionType;

  @Expose()
  @Type(() => String)
  category?: string;

  @Expose()
  @Type(() => String)
  description?: string;

  @Expose()
  @Type(() => String)
  reference?: string;

  @Expose()
  status: TransactionStatus;

  @Expose()
  @Type(() => Number)
  fromAccountId?: number;

  @Expose()
  @Type(() => Number)
  toAccountId?: number;

  @Expose()
  @Transform(({ value }) => formatWIBDateTime(value))
  createdAt: string;

  @Expose()
  @Transform(({ value }) => formatWIBDateTime(value))
  updatedAt: string;
}

export class CreateTransactionResponseDto extends BaseTransactionResponseDto {}
export class TransactionResponseDto extends BaseTransactionResponseDto {}
