import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import {
  CreateUserResponseDto,
  UserResponseDto,
} from './dto/response/user-response.dto';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptor';
import { AuthGuardRoles } from 'src/auth/decorator/auth.decorator';
import { UserRole } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@AuthGuardRoles(UserRole.ADMIN)
@UseInterceptors(new SerializationInterceptor(UserResponseDto))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat user baru' })
  @ApiResponse({
    status: 201,
    description: 'User berhasil dibuat',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Input tidak valid',
  })
  @UseInterceptors(new SerializationInterceptor(CreateUserResponseDto))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Menampilkan semua user' })
  @ApiResponse({
    status: 200,
    description: 'Daftar semua user',
    type: [UserResponseDto],
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil detail user berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID user' })
  @ApiResponse({
    status: 200,
    description: 'Detail user ditemukan',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User tidak ditemukan',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
}