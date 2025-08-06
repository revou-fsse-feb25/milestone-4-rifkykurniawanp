"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardRoles = AuthGuardRoles;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const role_guard_1 = require("../guards/role.guard");
const roles_decorator_1 = require("./roles.decorator");
function AuthGuardRoles(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(...roles));
}
