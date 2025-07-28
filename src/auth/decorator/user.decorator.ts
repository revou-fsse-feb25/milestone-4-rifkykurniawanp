import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extract user data (id, email, role, etc.) from JWT payload
 * via request.user injected by Passport JWT strategy.
 */
export const User = createParamDecorator(
  (data: keyof Express.User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // If specific key requested (e.g. @User('id')) return just that value
    if (data) {
      return request.user?.[data];
    }

    // If no key passed: return full user object
    return request.user;
  },
);
