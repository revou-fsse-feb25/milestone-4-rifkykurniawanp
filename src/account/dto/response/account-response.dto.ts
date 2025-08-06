import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus, AccountType } from '@prisma/client';
import { formatWIBDateTime } from '../../../common/utils/date-utils';

function safeToNumber(value: unknown): number {
  if (value === null || typeof value === 'undefined') return 0;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  if (typeof value === 'object' && value !== null && 'toNumber' in value) {
    try {
      return (value as any).toNumber();
    } catch {
      return 0;
    }
  }
  return 0;
}

export class BaseAccountResponseDto {
  @ApiProperty({ example: 123 })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: 'Main Account' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({ enum: AccountType, example: 'CHECKING' })
  @Expose()
  type: AccountType;

  @ApiProperty({ enum: AccountStatus, example: 'ACTIVE' })
  @Expose()
  status: AccountStatus;

  @ApiProperty({ example: 5000.0 })
  @Expose()
  @Transform(({ value }) => safeToNumber(value))
  balance: number;

  @ApiProperty({ example: 'USD' })
  @Expose()
  @Type(() => String)
  currency: string;

  @ApiProperty({ example: 1 })
  @Expose()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ example: '2024-07-30 12:00:00 WIB' })
  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  createdAt: string;

  @ApiProperty({ example: '2024-07-30 12:30:00 WIB' })
  @Expose()
  @Transform(({ value }) => (value ? formatWIBDateTime(value) : null))
  updatedAt: string;
}

export class CreateAccountResponseDto extends BaseAccountResponseDto {}
export class AccountResponseDto extends BaseAccountResponseDto {}
