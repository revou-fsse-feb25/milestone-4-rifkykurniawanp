import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,
    AccountModule,
    TransactionModule,
  ],
  controllers: [AppController], // Optional: for health check or general route
  providers: [AppService],      // Optional: if needed
})
export class AppModule {}
