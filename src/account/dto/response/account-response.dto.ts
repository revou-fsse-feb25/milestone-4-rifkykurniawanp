import { Expose, Type } from 'class-transformer';

export class AccountResponseDto {
  @Expose()
  id: number;

  @Expose()
  type: string;

  @Expose()
  balance: number;

  @Expose()
  userId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
