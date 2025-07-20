project-root/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│
│   ├── database/
│   │   ├── database.module.ts
│   │   └── database.service.ts
│
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts
│   │   ├── middleware/
│   │   │   └── request-logger.middleware.ts
│   │   ├── constants/
│   │   │   └── roles.enum.ts
│   │   └── utils/
│
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── strategy/
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/
│   │   │   └── jwt.guard.ts
│   │   ├── dto/
│   │   │   ├── request/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   └── response/
│   │   │       └── auth-response.dto.ts
│   │   ├── interfaces/
│   │   │   └── auth.interface.ts
│   │   └── common/
│   │       └── auth.enum.ts
│
│   ├── user/
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   ├── user.repository.ts
│   │   ├── dto/
│   │   │   ├── request/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── update-user.dto.ts
│   │   │   └── response/
│   │   │       └── user-response.dto.ts
│   │   ├── interfaces/
│   │   │   └── user.interface.ts
│   │   └── common/
│   │       └── user-role.enum.ts
│
│   ├── account/
│   │   ├── account.module.ts
│   │   ├── account.service.ts
│   │   ├── account.controller.ts
│   │   ├── account.repository.ts
│   │   ├── dto/
│   │   │   ├── request/
│   │   │   │   ├── create-account.dto.ts
│   │   │   │   └── update-account.dto.ts
│   │   │   └── response/
│   │   │       └── account-response.dto.ts
│   │   ├── interfaces/
│   │   │   └── account.interface.ts
│   │   └── common/
│   │       └── account-status.enum.ts
│
│   ├── transaction/
│   │   ├── transaction.module.ts
│   │   ├── transaction.service.ts
│   │   ├── transaction.controller.ts
│   │   ├── transaction.repository.ts
│   │   ├── dto/
│   │   │   ├── request/
│   │   │   │   ├── create-transaction.dto.ts
│   │   │   │   └── update-transaction.dto.ts
│   │   │   └── response/
│   │   │       └── transaction-response.dto.ts
│   │   ├── interfaces/
│   │   │   └── transaction.interface.ts
│   │   └── common/
│   │       └── transaction-type.enum.ts
