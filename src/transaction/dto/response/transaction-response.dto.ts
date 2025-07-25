import { Expose, Transform, Type } from 'class-transformer';
import { TransactionStatus, TransactionType, AccountStatus, AccountType } from '@prisma/client';
import { formatWIBDateTime } from 'src/common/utils/date-utils';
import { safeDecimalToNumber } from 'src/common/utils/number-utils';

export class BaseTransactionResponseDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Transform(({ value, key, obj }) => {
    console.log(`[TransactionDTO] Transforming ${key}:`, value, 'from object:', obj);
    return safeDecimalToNumber(value);
  })
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
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  createdAt: string;

  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  updatedAt: string;
}

export class BaseAccountResponseDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  type: AccountType;

  @Expose()
  status: AccountStatus;

  @Expose()
  @Transform(({ value, key, obj }) => {
    console.log(`[AccountDTO] Transforming ${key}:`, value, 'from object:', obj);
    return safeDecimalToNumber(value);
  })
  balance: number;

  @Expose()
  @Type(() => String)
  currency: string;

  @Expose()
  @Type(() => Number)
  userId: number;

  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  createdAt: string;

  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  updatedAt: string;
}

export class CreateTransactionResponseDto extends BaseTransactionResponseDto {}
export class TransactionResponseDto extends BaseTransactionResponseDto {}
export class CreateAccountResponseDto extends BaseAccountResponseDto {}
export class AccountResponseDto extends BaseAccountResponseDto {}