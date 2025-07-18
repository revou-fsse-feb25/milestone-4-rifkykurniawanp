import { IsString, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  accountNumber: string;

  @IsNumber()
  balance: number;

  @IsNumber()
  userId: number;
}
