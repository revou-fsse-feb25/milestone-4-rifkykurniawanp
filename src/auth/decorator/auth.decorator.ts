import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from './roles.decorator';

export function AuthGuardRoles(...roles: string[]) {
  return applyDecorators(
    UseGuards(JwtGuard, RolesGuard),
    Roles(...roles)
  );
}
