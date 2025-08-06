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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const prisma_service_1 = require("../prisma/prisma.service");
let TransactionService = class TransactionService {
    transactionRepository;
    prisma;
    constructor(transactionRepository, prisma) {
        this.transactionRepository = transactionRepository;
        this.prisma = prisma;
    }
    async create(dto) {
        const preparedDto = {
            ...dto,
            amount: new library_1.Decimal(dto.amount),
        };
        return this.transactionRepository.create(preparedDto);
    }
    async findAll() {
        return this.transactionRepository.findAll();
    }
    async findOne(id) {
        const tx = await this.transactionRepository.findOne(id);
        if (!tx) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        return tx;
    }
    async update(id, dto) {
        const preparedDto = {
            ...dto,
            amount: dto.amount !== undefined ? new library_1.Decimal(dto.amount) : undefined,
        };
        const updated = await this.transactionRepository.update(id, preparedDto);
        if (!updated) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const existing = await this.transactionRepository.findOne(id);
        if (!existing)
            return false;
        return this.transactionRepository.remove(id);
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
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TransactionRepository')),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], TransactionService);
