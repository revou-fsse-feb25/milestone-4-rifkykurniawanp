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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const prisma_service_1 = require("../prisma/prisma.service");
let AccountService = class AccountService {
    accountRepository;
    prisma;
    constructor(accountRepository, prisma) {
        this.accountRepository = accountRepository;
        this.prisma = prisma;
    }
    async create(dto) {
        return this.accountRepository.create({
            ...dto,
            balance: this.toOptionalDecimal(dto.balance),
        });
    }
    async findAll() {
        return this.accountRepository.findAll();
    }
    async findOne(id) {
        const account = await this.accountRepository.findOne(id);
        if (!account) {
            throw new common_1.NotFoundException(`Account with ID ${id} not found`);
        }
        return account;
    }
    async update(id, dto) {
        await this.findOne(id);
        const updated = await this.accountRepository.update(id, {
            ...dto,
            balance: this.toOptionalDecimal(dto.balance),
        });
        if (!updated) {
            throw new common_1.NotFoundException(`Account with ID ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const existing = await this.accountRepository.findOne(id);
        if (!existing)
            return false;
        return this.accountRepository.remove(id);
    }
    toOptionalDecimal(value) {
        if (value === null || value === undefined)
            return undefined;
        return value instanceof library_1.Decimal ? value : new library_1.Decimal(value);
    }
    async testDecimalFields() {
        console.log('=== TESTING DECIMAL FIELDS ===');
        const account = await this.prisma.account.findFirst();
        console.log('Raw account from DB:', account);
        console.log('Balance type:', typeof account?.balance);
        console.log('Balance value:', account?.balance);
        const transaction = await this.prisma.transaction.findFirst();
        console.log('Raw transaction from DB:', transaction);
        console.log('Amount type:', typeof transaction?.amount);
        console.log('Amount value:', transaction?.amount);
        console.log('=== END TEST ===');
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AccountRepository')),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], AccountService);
