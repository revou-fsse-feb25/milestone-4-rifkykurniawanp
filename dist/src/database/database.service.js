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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const config_1 = require("@nestjs/config");
let DatabaseService = class DatabaseService {
    configService;
    client;
    constructor(configService) {
        this.configService = configService;
        const host = this.configService.get('DATABASE_HOST');
        const port = this.configService.get('DATABASE_PORT');
        const user = this.configService.get('DATABASE_USER');
        const password = this.configService.get('DATABASE_PASSWORD');
        const database = this.configService.get('DATABASE_NAME');
        console.log('[Database Config]');
        console.log({ host, port, user, password, database });
        if (!password || typeof password !== 'string') {
            throw new Error('❌ DATABASE_PASSWORD must be defined as a string in your environment');
        }
        this.client = new pg_1.Client({
            host,
            port,
            user,
            password,
            database,
        });
    }
    async onModuleInit() {
        await this.client.connect();
        console.log('✅ PostgreSQL connected');
    }
    async onModuleDestroy() {
        await this.client.end();
    }
    getClient() {
        return this.client;
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
