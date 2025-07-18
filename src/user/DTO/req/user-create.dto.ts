// src/user/dto/create-user.dto.ts

import { IsString, IsEmail, IsNotEmpty, IsArray, ArrayNotEmpty, IsEnum, IsBoolean, MinLength } from 'class-validator';
import { UserRole } from '../../common/user-role.enum';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @IsBoolean()
  isActive: boolean;
}
