# RevoBank - NestJS Banking API 🏦

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-revobank.up.railway.app-success)](https://revobank.up.railway.app/)
[![API Docs](https://img.shields.io/badge/📚_API_Docs-Swagger-blue)](https://revobank.up.railway.app/api/docs)
[![Node.js Version](https://img.shields.io/badge/node-18.x-green.svg)](https://nodejs.org/)
[![NestJS Version](https://img.shields.io/badge/nestjs-10.x-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/database-Supabase-green.svg)](https://supabase.com/)
[![Deployment](https://img.shields.io/badge/deployed_on-Railway-purple.svg)](https://railway.app/)

## 🌐 Live Application

**🔗 Application URL**: [https://revobank.up.railway.app/](https://revobank.up.railway.app/)  
**📖 API Documentation**: [https://revobank.up.railway.app/api/docs](https://revobank.up.railway.app/api/docs)  
**🗄️ Database**: Supabase PostgreSQL  
**☁️ Hosting**: Railway Platform  

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo Features](#live-demo-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication & Security](#authentication--security)
- [Local Development](#local-development)
- [Deployment Architecture](#deployment-architecture)
- [Testing](#testing)
- [Performance & Monitoring](#performance--monitoring)
- [Contributing](#contributing)

## 🎯 Overview

**RevoBank** is a comprehensive banking API built for Milestone 4 of the RevoU Full Stack Software Engineering program. This production-ready application demonstrates modern backend development practices with NestJS, featuring a complete banking system with user management, account operations, and transaction processing.

### 🎓 **Milestone 4 Learning Objectives:**
- ✅ **Production Deployment**: Live application on Railway platform
- ✅ **Cloud Database**: Supabase PostgreSQL integration
- ✅ **Modern Architecture**: NestJS with TypeScript and modular design
- ✅ **API Documentation**: Interactive Swagger documentation
- ✅ **Authentication**: JWT-based security system
- ✅ **Database Design**: Normalized schema with relationships
- ✅ **Error Handling**: Comprehensive validation and error responses
- ✅ **DevOps**: CI/CD pipeline with automated deployment

### 🏦 **Banking Domain Features:**
- User registration and authentication
- Account management (checking, savings accounts)
- Money transfers between accounts
- Transaction history and tracking
- Balance inquiries and account statements
- Role-based access control (customers, admins)

## 🚀 Live Demo Features

### 🔓 **Public Endpoints**
Try these endpoints without authentication:
- `GET /` - Welcome message and API status
- `GET /health` - Application health check
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Authenticate user

### 🔐 **Protected Banking Operations**
*Requires JWT authentication:*
- `GET /users/profile` - Get user profile and account details
- `GET /accounts` - List user's bank accounts
- `POST /accounts` - Create new bank account
- `POST /transfers` - Transfer money between accounts
- `GET /transactions` - View transaction history

### 📊 **Admin Operations**
*Requires admin role:*
- `GET /admin/users` - Manage all users
- `GET /admin/transactions` - System-wide transaction monitoring
- `POST /admin/accounts/freeze` - Account management operations

## 🛠 Technology Stack

### **Backend Framework**
- **NestJS 10.x** - Progressive Node.js framework with TypeScript
- **Node.js 18.x** - Runtime environment
- **TypeScript 5.x** - Static type checking and modern JavaScript features

### **Database & Storage**
- **Supabase** - Cloud PostgreSQL database with real-time features
- **TypeORM** - Object-Relational Mapping with decorators
- **PostgreSQL 15** - Relational database with ACID compliance

### **Authentication & Security**
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Passport.js** - Authentication middleware
- **Bcrypt** - Password hashing with salt
- **Class-Validator** - Input validation and transformation
- **Helmet** - Security headers middleware

### **Documentation & API**
- **Swagger/OpenAPI 3.0** - Interactive API documentation
- **Class-Transformer** - Object transformation and serialization

### **Cloud Infrastructure**
- **Railway** - Platform-as-a-Service deployment
- **Supabase** - Backend-as-a-Service database
- **GitHub Actions** - CI/CD pipeline (if implemented)

### **Development Tools**
- **ESLint & Prettier** - Code quality and formatting
- **Jest** - Testing framework
- **Supertest** - HTTP assertion testing
- **Docker** - Containerization for consistent environments

## 🏗 Architecture

### **Modular Architecture**
```
src/
├── auth/                   # Authentication & Authorization
│   ├── guards/            # JWT and Role guards
│   ├── strategies/        # Passport JWT strategy
│   ├── dto/               # Login/Register DTOs
│   └── decorators/        # Custom auth decorators
├── users/                 # User Management
│   ├── entities/          # User entity definition
│   ├── dto/               # User DTOs (create, update)
│   └── services/          # User business logic
├── accounts/              # Bank Account Management
│   ├── entities/          # Account entity (checking, savings)
│   ├── dto/               # Account operation DTOs
│   └── services/          # Account business logic
├── transactions/          # Transaction Processing
│   ├── entities/          # Transaction entity
│   ├── dto/               # Transfer and transaction DTOs
│   └── services/          # Transaction business logic
├── common/                # Shared Application Components
│   ├── decorators/        # Custom decorators (@CurrentUser)
│   ├── filters/           # Global exception filters
│   ├── guards/            # Custom guards (RoleGuard)
│   ├── interceptors/      # Response transformation
│   └── pipes/             # Validation pipes
├── config/                # Configuration Management
│   ├── database.config.ts # Supabase connection config
│   ├── jwt.config.ts      # JWT configuration
│   └── app.config.ts      # Application settings
└── main.ts               # Application bootstrap
```

## 📁 Complete Project Structure

```
milestone-4-rifkykurniawanp/
├── src/                        # Source code
│   ├── auth/                   # Authentication & Authorization
│   │   ├── guards/            # JWT and Role guards
│   │   ├── strategies/        # Passport JWT strategy
│   │   ├── dto/               # Login/Register DTOs
│   │   └── decorators/        # Custom auth decorators
│   ├── users/                 # User Management
│   │   ├── entities/          # User entity definition
│   │   ├── dto/               # User DTOs (create, update)
│   │   └── services/          # User business logic
│   ├── accounts/              # Bank Account Management
│   │   ├── entities/          # Account entity (checking, savings)
│   │   ├── dto/               # Account operation DTOs
│   │   └── services/          # Account business logic
│   ├── transactions/          # Transaction Processing
│   │   ├── entities/          # Transaction entity
│   │   ├── dto/               # Transfer and transaction DTOs
│   │   └── services/          # Transaction business logic
│   ├── common/                # Shared Application Components
│   │   ├── decorators/        # Custom decorators (@CurrentUser)
│   │   ├── filters/           # Global exception filters
│   │   ├── guards/            # Custom guards (RoleGuard)
│   │   ├── interceptors/      # Response transformation
│   │   └── pipes/             # Validation pipes
│   ├── config/                # Configuration Management
│   │   ├── database.config.ts # Supabase connection config
│   │   ├── jwt.config.ts      # JWT configuration
│   │   └── app.config.ts      # Application settings
│   └── main.ts               # Application bootstrap
├── docs/                      # 📋 DOCUMENTATION FILES
│   ├── images/                # 📸 Screenshots for README
│   │   ├── swagger-overview.png
│   │   ├── auth-endpoints.png
│   │   ├── login-example.png
│   │   ├── register-example.png
│   │   ├── banking-operations.png
│   │   ├── protected-routes.png
│   │   ├── error-handling.png
│   │   └── database-schemas.png
│   ├── api/                   # API Documentation
│   │   ├── swagger.json       # Generated Swagger spec
│   │   ├── postman-collection.json
│   │   └── api-guide.md       # API usage guide
│   ├── deployment/            # Deployment Documentation
│   │   ├── railway-setup.md   # Railway deployment guide
│   │   ├── supabase-config.md # Database setup guide
│   │   └── environment-vars.md # Environment configuration
│   └── development/           # Development Documentation
│       ├── local-setup.md     # Local development guide
│       ├── coding-standards.md # Code style guide
│       └── testing-guide.md   # Testing documentation
├── test/                      # Test files
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── e2e/                  # End-to-end tests
├── .env.example              # Environment template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── nest-cli.json           # NestJS CLI configuration
├── docker-compose.yml      # Docker setup (optional)
├── Dockerfile             # Container configuration
├── README.md              # 📖 Main documentation (this file)
└── LICENSE               # MIT License
```

### **Database Design**
```sql
-- Core Banking Entities
Users (id, email, password, firstName, lastName, role, createdAt)
Accounts (id, userId, accountType, accountNumber, balance, isActive)
Transactions (id, fromAccountId, toAccountId, amount, type, description, timestamp)
```

## 📚 API Documentation

### 🌐 **Interactive Documentation**
Visit the live Swagger documentation: **[https://revobank.up.railway.app/api/docs](https://revobank.up.railway.app/api/docs)**

### 🔑 **Authentication Endpoints**
```http
POST /auth/register         # Create new user account
POST /auth/login           # Authenticate and receive JWT
POST /auth/refresh         # Refresh access token
GET  /auth/profile         # Get current user profile
```

### 👤 **User Management**
```http
GET    /users/profile      # Get current user details
PUT    /users/profile      # Update user information
DELETE /users/account      # Close user account
```

### 🏦 **Account Operations**
```http
GET    /accounts           # List user's accounts
POST   /accounts           # Create new account (checking/savings)
GET    /accounts/:id       # Get specific account details
PUT    /accounts/:id       # Update account settings
```

### 💸 **Transaction System**
```http
POST   /transfers          # Transfer money between accounts
GET    /transactions       # Get transaction history
GET    /transactions/:id   # Get specific transaction details
GET    /accounts/:id/balance # Check account balance
```

### 🛡️ **Admin Operations**
```http
GET    /admin/users        # List all users (admin only)
GET    /admin/transactions # All system transactions
POST   /admin/accounts/freeze # Freeze/unfreeze accounts
GET    /admin/reports      # Generate system reports
```

## 🗄️ Database Schema

### **User Entity**
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Exclude from queries by default
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: UserRole.CUSTOMER })
  role: UserRole;

  @OneToMany(() => Account, account => account.user)
  accounts: Account[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### **Account Entity**
```typescript
@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.accounts)
  user: User;

  @Column({ unique: true })
  accountNumber: string;

  @Column({ type: 'enum', enum: AccountType })
  accountType: AccountType; // CHECKING, SAVINGS

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  balance: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, transaction => transaction.fromAccount)
  outgoingTransactions: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.toAccount)
  incomingTransactions: Transaction[];
}
```

### **Transaction Entity**
```typescript
@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, account => account.outgoingTransactions)
  fromAccount: Account;

  @ManyToOne(() => Account, account => account.incomingTransactions)
  toAccount: Account;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType; // TRANSFER, DEPOSIT, WITHDRAWAL

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  timestamp: Date;
}
```

## 🔐 Authentication & Security

### **JWT Implementation**
- **Access Tokens**: 15-minute expiration for security
- **Refresh Tokens**: 7-day expiration for user convenience
- **Token Storage**: HTTP-only cookies in production
- **Payload**: User ID, email, and role information

### **Role-Based Access Control**
```typescript
enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  MANAGER = 'manager'
}

// Usage in controllers
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Get('admin/users')
async getAllUsers() {
  // Admin-only endpoint
}
```

### **Security Features**
- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ JWT token validation on protected routes
- ✅ Rate limiting on authentication endpoints
- ✅ Input validation and sanitization
- ✅ SQL injection prevention with TypeORM
- ✅ XSS protection with Helmet middleware
- ✅ CORS configuration for frontend integration

## 💻 Local Development

### **Prerequisites**
- Node.js 18.x or higher
- npm or yarn package manager
- Git for version control

### **Quick Start**
```bash
# 1. Clone the repository
git clone https://github.com/revou-fsse-feb25/milestone-4-rifkykurniawanp.git
cd milestone-4-rifkykurniawanp

# 2. Install dependencies
npm install

# 3. Environment setup
cp .env.example .env
# Update .env with your Supabase credentials

# 4. Run database migrations
npm run migration:run

# 5. Start development server
npm run start:dev
```

### **Environment Variables**
```env
# Application
NODE_ENV=development
PORT=3000

# Supabase Database
DATABASE_URL=postgresql://user:password@host:port/database
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# API Configuration
API_PREFIX=api
SWAGGER_ENABLED=true
```

### **Development Scripts**
```bash
# Development
npm run start:dev        # Start with hot reload
npm run start:debug      # Start in debug mode

# Building
npm run build           # Build for production
npm run start:prod      # Run production build

# Database
npm run migration:generate  # Generate migration
npm run migration:run      # Run migrations
npm run migration:revert   # Revert last migration

# Testing
npm run test            # Unit tests
npm run test:e2e        # End-to-end tests
npm run test:cov        # Test coverage

# Code Quality
npm run lint            # ESLint checking
npm run format          # Prettier formatting
```

## ☁️ Deployment Architecture

### **Railway Deployment**
- **Platform**: Railway.app - Modern deployment platform
- **Build**: Automatic builds from GitHub repository
- **Environment**: Production environment variables
- **Domain**: Custom domain with SSL certificate
- **Monitoring**: Built-in application monitoring

### **Supabase Integration**
- **Database**: Managed PostgreSQL with automatic backups
- **Connection**: SSL-encrypted connections
- **Scaling**: Automatic scaling based on usage
- **Dashboard**: Real-time database monitoring
- **Security**: Row-level security policies

### **Production Optimizations**
```typescript
// Production configurations
{
  "compression": true,           // Gzip compression
  "cors": {                     // CORS for frontend
    "origin": process.env.FRONTEND_URL,
    "credentials": true
  },
  "rateLimit": {                // API rate limiting
    "windowMs": 15 * 60 * 1000, // 15 minutes
    "max": 100                  // limit each IP to 100 requests per windowMs
  }
}
```

## 🧪 Testing

### **Test Coverage**
```bash
# Run all tests with coverage
npm run test:cov

# Expected coverage targets:
# Statements: > 80%
# Branches: > 75%
# Functions: > 80%
# Lines: > 80%
```

### **Test Types**
- **Unit Tests**: Individual service and controller testing
- **Integration Tests**: Database and API endpoint testing
- **E2E Tests**: Complete user workflow testing

### **Example Test**
```typescript
describe('AuthController', () => {
  it('should login user with valid credentials', async () => {
    const loginDto = { email: 'test@example.com', password: 'password123' };
    const result = await request(app)
      .post('/auth/login')
      .send(loginDto)
      .expect(200);
    
    expect(result.body).toHaveProperty('accessToken');
    expect(result.body).toHaveProperty('user');
  });
});
```

## 📊 Performance & Monitoring

### **Performance Features**
- **Database Indexing**: Optimized queries with proper indexes
- **Response Caching**: Cacheable endpoints with appropriate headers
- **Lazy Loading**: Efficient data loading strategies
- **Pagination**: Large dataset handling with cursor-based pagination

### **Monitoring & Logging**
- **Health Checks**: `/health` endpoint for monitoring services
- **Structured Logging**: JSON-formatted logs for production
- **Error Tracking**: Comprehensive error handling and reporting
- **Performance Metrics**: Response time and throughput monitoring

## 🔧 API Testing Guide

### **Using the Live API**

1. **Test Authentication**
   ```bash
   # Register new user
   curl -X POST https://revobank.up.railway.app/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
   
   # Login to get JWT token
   curl -X POST https://revobank.up.railway.app/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. **Use Protected Endpoints**
   ```bash
   # Get user profile (replace YOUR_JWT_TOKEN)
   curl -X GET https://revobank.up.railway.app/users/profile \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

3. **Try Banking Operations**
   ```bash
   # Create bank account
   curl -X POST https://revobank.up.railway.app/accounts \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"accountType":"CHECKING"}'
   ```

## 📝 Milestone 4 Requirements ✅

- ✅ **NestJS Framework**: Complete backend API implementation
- ✅ **TypeScript**: Full TypeScript implementation with strict mode
- ✅ **Database Integration**: Supabase PostgreSQL with TypeORM
- ✅ **Authentication**: JWT-based authentication system
- ✅ **Authorization**: Role-based access control
- ✅ **API Documentation**: Interactive Swagger documentation
- ✅ **Input Validation**: DTO validation with class-validator
- ✅ **Error Handling**: Global exception filters
- ✅ **Testing**: Unit and integration tests
- ✅ **Production Deployment**: Live application on Railway
- ✅ **Security**: HTTPS, CORS, rate limiting, password hashing
- ✅ **Database Design**: Normalized schema with relationships
- ✅ **Code Quality**: ESLint, Prettier, TypeScript strict mode

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### **Development Guidelines**
- Follow TypeScript and ESLint rules
- Write tests for new features
- Update documentation for API changes
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **RevoU FSSE Program** - Comprehensive full-stack curriculum
- **Railway** - Seamless deployment platform
- **Supabase** - Powerful backend-as-a-service
- **NestJS Community** - Amazing framework and documentation
- **Instructors & Mentors** - Guidance throughout the learning journey

## 📞 Contact & Links

**Rifky Kurniawan P**  
🌐 **Live Application**: [https://revobank.up.railway.app/](https://revobank.up.railway.app/)  
📖 **API Documentation**: [https://revobank.up.railway.app/api/docs](https://revobank.up.railway.app/api/docs)  
💻 **GitHub**: [@rifkykurniawanp](https://github.com/rifkykurniawanp)  
📧 **Email**: rifkykurniawan.p@example.com  
💼 **LinkedIn**: [Rifky Kurniawan P](https://linkedin.com/in/rifkykurniawan)  

---

**🏆 RevoU FSSE February 2025 - Milestone 4**  
**🚀 Project Repository**: [https://github.com/revou-fsse-feb25/milestone-4-rifkykurniawanp](https://github.com/revou-fsse-feb25/milestone-4-rifkykurniawanp)