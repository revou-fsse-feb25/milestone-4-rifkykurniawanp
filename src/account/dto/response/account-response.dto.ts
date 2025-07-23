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
  type: AccountType;

  @Expose()
  status: AccountStatus;

  @Expose()
  @Transform(({ value, key, obj }) => {
    console.log(`[AccountDTO] Field: ${key}, Value:`, value, 'Type:', typeof value);
    console.log(`[AccountDTO] Full object keys:`, Object.keys(obj || {}));
    
    // Handle the case where balance is already a number from database
    if (typeof value === 'number') {
      console.log(`[AccountDTO] Balance is already a number:`, value);
      return value;
    }
    
    // Handle null/undefined
    if (value === null || value === undefined) {
      console.log(`[AccountDTO] Balance is null/undefined, returning 0`);
      return 0;
    }
    
    // Handle Prisma Decimal object
    if (typeof value === 'object' && value !== null && 'toNumber' in value) {
      try {
        const result = value.toNumber();
        console.log(`[AccountDTO] Converted Decimal:`, value, '->', result);
        return result;
      } catch (e) {
        console.warn(`[AccountDTO] Failed to convert Decimal:`, e);
        return 0;
      }
    }
    
    // Handle string
    if (typeof value === 'string') {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        console.warn(`[AccountDTO] Invalid string value:`, value);
        return 0;
      }
      console.log(`[AccountDTO] Converted string:`, value, '->', numValue);
      return numValue;
    }
    
    console.warn(`[AccountDTO] Unexpected value type:`, typeof value, value);
    return 0;
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

export class CreateAccountResponseDto extends BaseAccountResponseDto {}
export class AccountResponseDto extends BaseAccountResponseDto {}