import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, IsPositive, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountStatus, AccountType } from '@prisma/client';

export class CreateAccountDto {
  @ApiProperty({ example: 'Main Checking Account', description: 'Nama akun keuangan' })
  @IsString()
  @IsNotEmpty({ message: 'Account name is required' })
  name: string;

  @ApiPropertyOptional({ enum: AccountType, description: 'Tipe akun (CHECKING/SAVINGS)' })
  @IsEnum(AccountType, { message: 'Invalid account type (CHECKING/SAVINGS)' })
  @IsOptional()
  type?: AccountType;

  @ApiPropertyOptional({ enum: AccountStatus, description: 'Status akun (ACTIVE/INACTIVE/CLOSED)' })
  @IsEnum(AccountStatus, { message: 'Invalid account status (ACTIVE/INACTIVE/CLOSED)' })
  @IsOptional()
  status?: AccountStatus;

  @ApiPropertyOptional({
    example: 5000.00,
    description: 'Saldo awal akun',
    type: Number,
  })
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'Balance must be a valid number with up to 2 decimal places' },
  )
  @IsOptional()
  @IsPositive({ message: 'Balance must be a positive number' })
  balance?: number;

  @ApiPropertyOptional({
    example: 'USD',
    description: 'Kode mata uang (3 huruf ISO 4217)',
  })
  @IsString()
  @IsOptional()
  @Length(3, 3, { message: 'Currency must be exactly 3 letters (e.g., USD)' })
  currency?: string;

  @ApiProperty({ example: 1, description: 'ID user yang memiliki akun ini' })
  @IsNumber({}, { message: 'User ID must be a valid number' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;
}
