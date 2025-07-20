import { ArrayNotEmpty, IsArray, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { AccountRole } from 'src/account/common/account-role.enum';

export class CreateAccountDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(AccountRole, { each: true })
  type: AccountRole[];

  @IsNumber()
  @IsPositive()
  balance: number;

  @IsNumber()
  userId: number;
}
