import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const appName = 'Milestone 4 - Banking API';
    const version = '1.0.0';
    return `Welcome to ${appName} v${version} - Hello World!`;
  }

  getHealth() {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    const port = this.configService.get<string>('PORT', '3000');
    const hasDatabase = !!this.configService.get<string>('DATABASE_URL');
    
    return {
      status: 'OK',
      message: 'Hello World!',
      timestamp: new Date().toISOString(),
      environment: nodeEnv,
      port: port,
      database: hasDatabase ? 'Connected' : 'Not configured',
      version: '1.0.0',
      uptime: Math.floor(process.uptime()),
    };
  }
}