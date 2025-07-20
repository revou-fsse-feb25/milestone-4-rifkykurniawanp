import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './user.repository';
// import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUsersRepository',
      useClass: UserRepository,
    },
  ],
  imports: [AuthModule],
  exports: [UserService]
})
export class UserModule {}
