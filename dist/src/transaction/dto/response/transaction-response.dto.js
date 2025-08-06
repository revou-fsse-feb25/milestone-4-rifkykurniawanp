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
exports.AccountResponseDto = exports.CreateAccountResponseDto = exports.TransactionResponseDto = exports.CreateTransactionResponseDto = exports.BaseAccountResponseDto = exports.BaseTransactionResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
const date_utils_1 = require("../../../common/utils/date-utils");
const number_utils_1 = require("../../../common/utils/number-utils");
const swagger_1 = require("@nestjs/swagger");
class BaseTransactionResponseDto {
    id;
    amount;
    type;
    category;
    description;
    reference;
    status;
    fromAccountId;
    toAccountId;
    createdAt;
    updatedAt;
}
exports.BaseTransactionResponseDto = BaseTransactionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID unik transaksi',
        example: 1,
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseTransactionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nominal transaksi',
        example: 150000.50,
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value, key, obj }) => {
        console.log(`[TransactionDTO] Transforming ${key}:`, value, 'from object:', obj);
        return (0, number_utils_1.safeDecimalToNumber)(value);
    }),
    __metadata("design:type", Number)
], BaseTransactionResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Jenis transaksi',
        enum: client_1.TransactionType,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseTransactionResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Kategori transaksi',
        example: 'Makanan',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseTransactionResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Deskripsi transaksi',
        example: 'Pembelian makan siang di restoran',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseTransactionResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Referensi transaksi',
        example: 'TRX-2024-001',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseTransactionResponseDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status transaksi',
        enum: client_1.TransactionStatus,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseTransactionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID akun sumber',
        example: 1,
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseTransactionResponseDto.prototype, "fromAccountId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID akun tujuan',
        example: 2,
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseTransactionResponseDto.prototype, "toAccountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tanggal dan waktu pembuatan transaksi (WIB)',
        example: '2024-01-15 10:30:00 WIB',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? (0, date_utils_1.formatWIBDateTime)(value) : null)),
    __metadata("design:type", String)
], BaseTransactionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tanggal dan waktu terakhir update transaksi (WIB)',
        example: '2024-01-15 14:25:00 WIB',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? (0, date_utils_1.formatWIBDateTime)(value) : null)),
    __metadata("design:type", String)
], BaseTransactionResponseDto.prototype, "updatedAt", void 0);
class BaseAccountResponseDto {
    id;
    name;
    type;
    status;
    balance;
    currency;
    userId;
    createdAt;
    updatedAt;
}
exports.BaseAccountResponseDto = BaseAccountResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID unik akun',
        example: 1,
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseAccountResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nama akun',
        example: 'Rekening Tabungan BCA',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Jenis akun',
        enum: client_1.AccountType,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status akun',
        enum: client_1.AccountStatus,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Saldo akun',
        example: 2500000.75,
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value, key, obj }) => {
        console.log(`[AccountDTO] Transforming ${key}:`, value, 'from object:', obj);
        return (0, number_utils_1.safeDecimalToNumber)(value);
    }),
    __metadata("design:type", Number)
], BaseAccountResponseDto.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mata uang akun',
        example: 'IDR',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID pemilik akun',
        example: 1,
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseAccountResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tanggal dan waktu pembuatan akun (WIB)',
        example: '2024-01-10 09:00:00 WIB',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? (0, date_utils_1.formatWIBDateTime)(value) : null)),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tanggal dan waktu terakhir update akun (WIB)',
        example: '2024-01-15 16:45:00 WIB',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? (0, date_utils_1.formatWIBDateTime)(value) : null)),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "updatedAt", void 0);
class CreateTransactionResponseDto extends BaseTransactionResponseDto {
}
exports.CreateTransactionResponseDto = CreateTransactionResponseDto;
class TransactionResponseDto extends BaseTransactionResponseDto {
}
exports.TransactionResponseDto = TransactionResponseDto;
class CreateAccountResponseDto extends BaseAccountResponseDto {
}
exports.CreateAccountResponseDto = CreateAccountResponseDto;
class AccountResponseDto extends BaseAccountResponseDto {
}
exports.AccountResponseDto = AccountResponseDto;
