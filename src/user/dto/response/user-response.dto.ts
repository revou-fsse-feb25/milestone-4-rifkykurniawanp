import { Expose, Transform } from 'class-transformer';
import { UserRole } from '@prisma/client';
import { formatWIBDateTime } from '../../../common/utils/date-utils';
import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResponseDto {
  @ApiProperty({
    description: 'ID unik user',
    example: 1,
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Nama lengkap user',
    example: 'John Doe',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Email user',
    example: 'john.doe@example.com',
    type: String,
    format: 'email',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Role user dalam sistem',
    enum: UserRole,
    example: UserRole.USER,
  })
  @Expose()
  role: UserRole;

  @ApiProperty({
    description: 'Status aktif user',
    example: true,
    type: Boolean,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Tanggal dan waktu pembuatan user (WIB)',
    example: '2024-01-15 10:30:00 WIB',
    type: String,
  })
  @Expose()
  @Transform(({ value }) => formatWIBDateTime(value), { toClassOnly: true })
  createdAt: string;

  @ApiProperty({
    description: 'Tanggal dan waktu terakhir update user (WIB)',
    example: '2024-01-15 14:25:00 WIB',
    type: String,
  })
  @Expose()
  @Transform(({ value }) => formatWIBDateTime(value), { toClassOnly: true })
  updatedAt: string;
}

export class CreateUserResponseDto extends BaseUserResponseDto {
  // Inherits all properties from BaseUserResponseDto
  // Swagger documentation is automatically inherited
}

export class UserResponseDto extends BaseUserResponseDto {
  // Inherits all properties from BaseUserResponseDto
  // Swagger documentation is automatically inherited
}