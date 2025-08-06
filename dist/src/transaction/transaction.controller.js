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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const create_transaction_dto_1 = require("./dto/request/create-transaction.dto");
const upate_transaction_dto_1 = require("./dto/request/upate-transaction.dto");
const transaction_response_dto_1 = require("./dto/response/transaction-response.dto");
const serialization_interceptor_1 = require("../common/interceptors/serialization.interceptor");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let TransactionController = class TransactionController {
    transactionService;
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async create(dto) {
        return this.transactionService.create(dto);
    }
    async findAll() {
        return this.transactionService.findAll();
    }
    async findOne(id) {
        return this.transactionService.findOne(id);
    }
    async update(id, dto) {
        return this.transactionService.update(id, dto);
    }
    async remove(id) {
        const result = await this.transactionService.remove(id);
        if (!result)
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        return { success: true };
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Membuat transaksi baru' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Transaksi berhasil dibuat',
        type: transaction_response_dto_1.CreateTransactionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Input tidak valid',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Tidak terotorisasi',
    }),
    (0, common_1.UseInterceptors)(new serialization_interceptor_1.SerializationInterceptor(transaction_response_dto_1.CreateTransactionResponseDto)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Menampilkan semua transaksi' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Daftar semua transaksi',
        type: [transaction_response_dto_1.TransactionResponseDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Tidak terotorisasi',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mengambil detail transaksi berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID transaksi' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Detail transaksi ditemukan',
        type: transaction_response_dto_1.TransactionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Transaksi tidak ditemukan',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Tidak terotorisasi',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Memperbarui data transaksi berdasarkan ID (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID transaksi' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Transaksi berhasil diperbarui',
        type: transaction_response_dto_1.TransactionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Transaksi tidak ditemukan',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Tidak terotorisasi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Akses ditolak - hanya admin yang dapat mengupdate transaksi',
    }),
    (0, auth_decorator_1.AuthGuardRoles)(client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, upate_transaction_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Menghapus transaksi berdasarkan ID (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID transaksi' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Transaksi berhasil dihapus',
        schema: {
            type: 'object',
            properties: {
                success: {
                    type: 'boolean',
                    example: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Transaksi tidak ditemukan',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Tidak terotorisasi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Akses ditolak - hanya admin yang dapat menghapus transaksi',
    }),
    (0, auth_decorator_1.AuthGuardRoles)(client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "remove", null);
exports.TransactionController = TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('transactions'),
    (0, auth_decorator_1.AuthGuardRoles)(client_1.UserRole.USER, client_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)(new serialization_interceptor_1.SerializationInterceptor(transaction_response_dto_1.TransactionResponseDto)),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
