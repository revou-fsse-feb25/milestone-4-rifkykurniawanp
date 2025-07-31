import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,        // Make config available globally
      envFilePath: '.env',   // Path to .env file
      cache: true,           // Cache environment variables
    }),
    UserModule,
    AccountModule,
    TransactionModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController], // Optional: for health check or general route
  providers: [AppService],      // Optional: if needed
})
export class AppModule {}