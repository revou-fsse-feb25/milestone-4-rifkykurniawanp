import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUsersRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService]
})
export class UserModule {}
