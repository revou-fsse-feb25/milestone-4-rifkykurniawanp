import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from './roles.decorator';
import { UserRole } from '@prisma/client';

export function AuthGuardRoles(...roles: UserRole[]) {
  return applyDecorators(
    UseGuards(JwtGuard, RolesGuard),
    Roles(...roles)
  );
}
