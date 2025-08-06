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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/request/create-user.dto");
const user_response_dto_1 = require("./dto/response/user-response.dto");
const serialization_interceptor_1 = require("../common/interceptors/serialization.interceptor");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    async findAll() {
        return this.userService.findAll();
    }
    async findOne(id) {
        const user = await this.userService.findOne(id);
        if (!user)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        return user;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Membuat user baru' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User berhasil dibuat',
        type: user_response_dto_1.CreateUserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Input tidak valid',
    }),
    (0, common_1.UseInterceptors)(new serialization_interceptor_1.SerializationInterceptor(user_response_dto_1.CreateUserResponseDto)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Menampilkan semua user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Daftar semua user',
        type: [user_response_dto_1.UserResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mengambil detail user berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Detail user ditemukan',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User tidak ditemukan',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    (0, auth_decorator_1.AuthGuardRoles)(client_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)(new serialization_interceptor_1.SerializationInterceptor(user_response_dto_1.UserResponseDto)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
