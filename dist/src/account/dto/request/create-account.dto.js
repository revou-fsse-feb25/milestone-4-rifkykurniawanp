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
exports.CreateAccountDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateAccountDto {
    name;
    type;
    status;
    balance;
    currency;
    userId;
}
exports.CreateAccountDto = CreateAccountDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Main Checking Account', description: 'Nama akun keuangan' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Account name is required' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.AccountType, description: 'Tipe akun (CHECKING/SAVINGS)' }),
    (0, class_validator_1.IsEnum)(client_1.AccountType, { message: 'Invalid account type (CHECKING/SAVINGS)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.AccountStatus, description: 'Status akun (ACTIVE/INACTIVE/CLOSED)' }),
    (0, class_validator_1.IsEnum)(client_1.AccountStatus, { message: 'Invalid account status (ACTIVE/INACTIVE/CLOSED)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 5000.00,
        description: 'Saldo awal akun',
        type: Number,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }, { message: 'Balance must be a valid number with up to 2 decimal places' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)({ message: 'Balance must be a positive number' }),
    __metadata("design:type", Number)
], CreateAccountDto.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'USD',
        description: 'Kode mata uang (3 huruf ISO 4217)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 3, { message: 'Currency must be exactly 3 letters (e.g., USD)' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID user yang memiliki akun ini' }),
    (0, class_validator_1.IsNumber)({}, { message: 'User ID must be a valid number' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'User ID is required' }),
    __metadata("design:type", Number)
], CreateAccountDto.prototype, "userId", void 0);
