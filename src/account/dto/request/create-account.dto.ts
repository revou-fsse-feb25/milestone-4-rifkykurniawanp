import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';
import { AccountStatus, AccountType } from '@prisma/client';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty({ message: 'Account name is required' })
  name: string;

  @IsEnum(AccountType, { message: 'Invalid account type (CHECKING/SAVINGS)' })
  @IsOptional()
  type?: AccountType;

  @IsEnum(AccountStatus, { message: 'Invalid account status (ACTIVE/INACTIVE/CLOSED)' })
  @IsOptional()
  status?: AccountStatus;

  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'Balance must be a valid number with up to 2 decimal places' },
  )
  @IsOptional()
  @IsPositive({ message: 'Balance must be a positive number' })
  balance?: number;

  @IsString()
  @IsOptional()
  @Length(3, 3, { message: 'Currency must be exactly 3 letters (e.g., USD)' })
  currency?: string;

  @IsNumber({}, { message: 'User ID must be a valid number' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;
}
