"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppService = class AppService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getHello() {
        const appName = 'Milestone 4 - Banking API';
        const version = '1.0.0';
        return `Welcome to ${appName} v${version} - Hello World!`;
    }
    getHealth() {
        const nodeEnv = this.configService.get('NODE_ENV', 'development');
        const port = this.configService.get('PORT', '3000');
        const hasDatabase = !!this.configService.get('DATABASE_URL');
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
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
