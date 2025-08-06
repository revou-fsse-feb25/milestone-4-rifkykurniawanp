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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const create_account_dto_1 = require("./dto/request/create-account.dto");
const update_account_dto_1 = require("./dto/request/update-account.dto");
const account_response_dto_1 = require("./dto/response/account-response.dto");
const serialization_interceptor_1 = require("../common/interceptors/serialization.interceptor");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let AccountController = class AccountController {
    accountService;
    constructor(accountService) {
        this.accountService = accountService;
    }
    async create(dto) {
        return this.accountService.create(dto);
    }
    async findAll() {
        return this.accountService.findAll();
    }
    async findOne(id) {
        return this.accountService.findOne(id);
    }
    async update(id, dto) {
        return this.accountService.update(id, dto);
    }
    async remove(id) {
        const result = await this.accountService.remove(id);
        if (!result) {
            throw new common_1.NotFoundException(`Account with ID ${id} not found`);
        }
        return { success: true };
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Membuat akun baru' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Akun berhasil dibuat',
        type: account_response_dto_1.CreateAccountResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Input tidak valid',
    }),
    (0, common_1.UseInterceptors)(new serialization_interceptor_1.SerializationInterceptor(account_response_dto_1.CreateAccountResponseDto)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Menampilkan semua akun' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Daftar semua akun',
        type: [account_response_dto_1.AccountResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mengambil detail akun berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID akun' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Detail akun ditemukan',
        type: account_response_dto_1.AccountResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Akun tidak ditemukan',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Memperbarui data akun berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID akun' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Akun berhasil diperbarui',
        type: account_response_dto_1.AccountResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Akun tidak ditemukan',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_account_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Menghapus akun berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID akun' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Akun berhasil dihapus',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Akun tidak ditemukan',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "remove", null);
exports.AccountController = AccountController = __decorate([
    (0, swagger_1.ApiTags)('Accounts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('accounts'),
    (0, auth_decorator_1.AuthGuardRoles)(client_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)(new serialization_interceptor_1.SerializationInterceptor(account_response_dto_1.AccountResponseDto)),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
