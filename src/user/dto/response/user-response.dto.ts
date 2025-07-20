
import { Expose, Transform, Type } from 'class-transformer';
import { UserRole } from '@prisma/client';
import { formatWIBDateTime } from 'src/common/utils';

export class BaseUserResponseDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  role: UserRole;

  @Expose()
  @Type(() => Boolean)
  isActive: boolean;

  @Expose()
  @Type(() => String)
  @Transform(({ value }) => formatWIBDateTime(value))
  createdAt: string;

  @Expose()
  @Type(() => String)
  @Transform(({ value }) => formatWIBDateTime(value))
  updatedAt: string;
}


export class CreateUserResponseDto extends BaseUserResponseDto {}


export class UserResponseDto extends BaseUserResponseDto {}
