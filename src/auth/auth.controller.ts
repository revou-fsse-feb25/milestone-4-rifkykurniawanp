import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return {
      message: 'Login successful',
      data: {
        userId: 1,
        username: 'testuser',
        token: 'abc123xyz', // Example token
      },
    };
  }
}
