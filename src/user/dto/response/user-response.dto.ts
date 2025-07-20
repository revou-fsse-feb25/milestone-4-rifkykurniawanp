// src/user/dto/response/user-response.dto.ts

import { Expose, Transform, Type } from 'class-transformer';
import { UserRole } from 'src/user/common/user-role.enum';
import { formatWIBDateTime } from 'src/common/utils';

export class UserCreatedDto {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  fullName: string;
}

export class UserResponseDto {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  fullName: string;

  @Expose()
  @Type(() => Boolean)
  isActive: boolean;

  @Expose()
  @Type(() => String)
  roles: UserRole[];

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => formatWIBDateTime(value))
  createdAt: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => formatWIBDateTime(value))
  updatedAt: string;
}
