import { IsNumber, IsEnum, IsString, IsOptional } from 'class-validator';
import { TransactionType } from 'src/transaction/common/transaction-role.enum';

export class UpdateTransactionDto {
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  accountId?: number;
}