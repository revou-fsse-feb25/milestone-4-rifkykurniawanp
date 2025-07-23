import { Expose, Transform, Type } from 'class-transformer';
import { AccountStatus, AccountType } from '@prisma/client';
import { formatWIBDateTime } from 'src/common/utils';

export class BaseAccountResponseDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  type: AccountType;

  @Expose()
  @Type(() => String)
  status: AccountStatus;

  @Expose()
  @Transform(({ value }) => Number(value))
  balance: number;

  @Expose()
  @Type(() => String)
  currency: string;

  @Expose()
  @Type(() => Number)
  userId: number;

  @Expose()
  @Transform(({ value }) => formatWIBDateTime(value))
  createdAt: string;

  @Expose()
  @Transform(({ value }) => formatWIBDateTime(value))
  updatedAt: string;
}

export class CreateAccountResponseDto extends BaseAccountResponseDto {}
export class AccountResponseDto extends BaseAccountResponseDto {}
