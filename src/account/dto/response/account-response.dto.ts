import { Expose, Transform, Type } from 'class-transformer';
import { AccountStatus, AccountType } from '@prisma/client';
import { formatWIBDateTime } from 'src/common/utils/date-utils';

/**
 * Safe transform to number — handles Decimal, string, number, or null/undefined input.
 */
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
  @Transform(({ value }) => safeToNumber(value))
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

export class CreateAccountResponseDto extends BaseAccountResponseDto {}
export class AccountResponseDto extends BaseAccountResponseDto {}
