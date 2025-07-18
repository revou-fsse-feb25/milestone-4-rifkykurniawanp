// src/users/dto/res/created-user-response.dto.ts

import { Expose, Type } from 'class-transformer';

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
