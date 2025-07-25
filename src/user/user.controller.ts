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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @AuthGuardRoles(UserRole.ADMIN)
  @UseInterceptors(new SerializationInterceptor(UserResponseDto))
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @AuthGuardRoles(UserRole.ADMIN)
  @UseInterceptors(new SerializationInterceptor(UserResponseDto))
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  @Post()
  @AuthGuardRoles(UserRole.ADMIN)
  @UseInterceptors(new SerializationInterceptor(CreateUserResponseDto))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
