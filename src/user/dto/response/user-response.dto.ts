import { Expose, Transform } from 'class-transformer';
import { UserRole } from '@prisma/client';
import { formatWIBDateTime } from 'src/common/utils';

export class BaseUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  isActive: boolean;

  @Expose()
  @Transform(({ value }) => formatWIBDateTime(value), { toClassOnly: true })
  createdAt: string;

  @Expose()
  @Transform(({ value }) => formatWIBDateTime(value), { toClassOnly: true })
  updatedAt: string;
}

export class CreateUserResponseDto extends BaseUserResponseDto {}

export class UserResponseDto extends BaseUserResponseDto {}
