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
exports.UserResponseDto = exports.CreateUserResponseDto = exports.BaseUserResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
const date_utils_1 = require("../../../common/utils/date-utils");
const swagger_1 = require("@nestjs/swagger");
class BaseUserResponseDto {
    id;
    name;
    email;
    role;
    isActive;
    createdAt;
    updatedAt;
}
exports.BaseUserResponseDto = BaseUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID unik user',
        example: 1,
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BaseUserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nama lengkap user',
        example: 'John Doe',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseUserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email user',
        example: 'john.doe@example.com',
        type: String,
        format: 'email',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseUserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role user dalam sistem',
        enum: client_1.UserRole,
        example: client_1.UserRole.USER,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseUserResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status aktif user',
        example: true,
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], BaseUserResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tanggal dan waktu pembuatan user (WIB)',
        example: '2024-01-15 10:30:00 WIB',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, date_utils_1.formatWIBDateTime)(value), { toClassOnly: true }),
    __metadata("design:type", String)
], BaseUserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tanggal dan waktu terakhir update user (WIB)',
        example: '2024-01-15 14:25:00 WIB',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, date_utils_1.formatWIBDateTime)(value), { toClassOnly: true }),
    __metadata("design:type", String)
], BaseUserResponseDto.prototype, "updatedAt", void 0);
class CreateUserResponseDto extends BaseUserResponseDto {
}
exports.CreateUserResponseDto = CreateUserResponseDto;
class UserResponseDto extends BaseUserResponseDto {
}
exports.UserResponseDto = UserResponseDto;
