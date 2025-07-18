import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return 'This action returns all users';
  }

  @Get(':id')
  findOne() {
    return 'This action returns a user';
  }

  @Post()
  create(@Body() createUserDto: any) {
    if (typeof this.userService.create === 'function') {
      return this.userService.create(createUserDto);
    }
    return { error: 'Create method not implemented' };
  }
}