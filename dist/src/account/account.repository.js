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
exports.AccountRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let AccountRepository = class AccountRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.account.findMany({
            include: { user: true },
        });
    }
    async findOne(id) {
        return this.prisma.account.findUnique({
            where: { id },
            include: { user: true },
        });
    }
    async findByUserId(userId) {
        return this.prisma.account.findMany({
            where: { userId },
            include: { user: true },
        });
    }
    async findActiveAccounts() {
        return this.prisma.account.findMany({
            where: { status: 'ACTIVE' },
            include: { user: true },
        });
    }
    async create(data) {
        return this.prisma.account.create({
            data: {
                ...data,
                balance: this.toDecimal(data.balance),
            },
        });
    }
    async update(id, data) {
        return this.prisma.account.update({
            where: { id },
            data: {
                ...data,
                balance: this.toOptionalDecimal(data.balance),
            },
        });
    }
    async remove(id) {
        try {
            await this.prisma.account.delete({ where: { id } });
            return true;
        }
        catch {
            return false;
        }
    }
    toDecimal(value) {
        if (value instanceof library_1.Decimal)
            return value;
        if (typeof value === 'number')
            return new library_1.Decimal(value);
        return new library_1.Decimal(0);
    }
    toOptionalDecimal(value) {
        if (value === null || value === undefined)
            return undefined;
        return this.toDecimal(value);
    }
};
exports.AccountRepository = AccountRepository;
exports.AccountRepository = AccountRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountRepository);
