import { Body, Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { CreateUserResponseDto, UserResponseDto } from './dto/response/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) =>
      plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findOne(+id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const newUser = await this.userService.create(createUserDto);
    return plainToInstance(CreateUserResponseDto, newUser, { excludeExtraneousValues: true });
  }
}
