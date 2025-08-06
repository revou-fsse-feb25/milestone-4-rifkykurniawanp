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
exports.AccountResponseDto = exports.CreateAccountResponseDto = exports.BaseAccountResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const date_utils_1 = require("../../../common/utils/date-utils");
function safeToNumber(value) {
    if (value === null || typeof value === 'undefined')
        return 0;
    if (typeof value === 'number')
        return value;
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    }
    if (typeof value === 'object' && value !== null && 'toNumber' in value) {
        try {
            return value.toNumber();
        }
        catch {
            return 0;
        }
    }
    return 0;
}
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
    (0, swagger_1.ApiProperty)({ example: 123 }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseAccountResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Main Account' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AccountType, example: 'CHECKING' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AccountStatus, example: 'ACTIVE' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000.0 }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => safeToNumber(value)),
    __metadata("design:type", Number)
], BaseAccountResponseDto.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseAccountResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-30 12:00:00 WIB' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? (0, date_utils_1.formatWIBDateTime)(value) : null)),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-30 12:30:00 WIB' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? (0, date_utils_1.formatWIBDateTime)(value) : null)),
    __metadata("design:type", String)
], BaseAccountResponseDto.prototype, "updatedAt", void 0);
class CreateAccountResponseDto extends BaseAccountResponseDto {
}
exports.CreateAccountResponseDto = CreateAccountResponseDto;
class AccountResponseDto extends BaseAccountResponseDto {
}
exports.AccountResponseDto = AccountResponseDto;
