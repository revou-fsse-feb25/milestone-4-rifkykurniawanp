import { IsNumber, IsEnum, IsString, IsOptional } from 'class-validator';
import { TransactionType } from 'src/transaction/common/transaction-role.enum';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  accountId: number;
}
