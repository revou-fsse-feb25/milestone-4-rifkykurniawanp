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
exports.CreateTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class CreateTransactionDto {
    amount;
    type;
    category;
    description;
    reference;
    status;
    fromAccountId;
    toAccountId;
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nominal transaksi (maksimal 2 digit desimal)',
        example: 150000.50,
        type: Number,
        minimum: 0.01,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }, { message: 'Amount must be a valid number with up to 2 decimal places' }),
    (0, class_validator_1.IsPositive)({ message: 'Amount must be greater than zero' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Amount is required' }),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Jenis transaksi',
        enum: client_1.TransactionType,
    }),
    (0, class_validator_1.IsEnum)(client_1.TransactionType, { message: 'Invalid transaction type' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Transaction type is required' }),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Kategori transaksi (maksimal 50 karakter)',
        example: 'Makanan',
        type: String,
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50, { message: 'Category must not exceed 50 characters' }),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Deskripsi transaksi (maksimal 255 karakter)',
        example: 'Pembelian makan siang di restoran',
        type: String,
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Description must not exceed 255 characters' }),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Referensi transaksi (maksimal 100 karakter)',
        example: 'TRX-2024-001',
        type: String,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Reference must not exceed 100 characters' }),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status transaksi',
        enum: client_1.TransactionStatus,
    }),
    (0, class_validator_1.IsEnum)(client_1.TransactionStatus, { message: 'Invalid transaction status' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID akun sumber (untuk transfer)',
        example: 1,
        type: Number,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'fromAccountId must be a number' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "fromAccountId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID akun tujuan (untuk transfer)',
        example: 2,
        type: Number,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'toAccountId must be a number' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "toAccountId", void 0);
