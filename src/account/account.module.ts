import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AccountRepository } from "./account.repository";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: 'IUsersRepository',
      useClass: AccountRepository,
    },
  ],
  exports: [AccountService]
})
export class AccountModule {}
