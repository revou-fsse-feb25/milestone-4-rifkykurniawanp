# RevoBank API

A modern banking API built with NestJS, featuring user management, account operations, and transaction processing.

## 🚀 Live Demo

- **API Endpoint**: [https://revobank.up.railway.app/](https://revobank.up.railway.app/)
- **API Documentation**: [https://revobank.up.railway.app/api](https://revobank.up.railway.app/api) (Swagger UI)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

- 👤 **User Management**: Create, read, update, and delete users
- 🏦 **Account Management**: Handle multiple bank accounts per user
- 💸 **Transaction Processing**: Manage deposits, withdrawals, and transfers
- 📚 **API Documentation**: Interactive Swagger documentation
- 🔒 **Data Validation**: Request/response DTOs with validation
- 🧪 **Testing**: Unit and E2E tests
- 🚀 **Production Ready**: Deployed on Railway with proper CI/CD

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [Prisma ORM](https://www.prisma.io/)
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/)
- **Testing**: [Jest](https://jestjs.io/)
- **Deployment**: [Railway](https://railway.app/)
- **Language**: TypeScript
- **Validation**: Class Validator & Class Transformer

## 📁 Project Structure

```
milestone-4-rifkykurniawanp/
├── src/
│   ├── app.controller.ts         # Main application controller
│   ├── app.module.ts            # Root application module
│   ├── app.service.ts           # Main application service
│   ├── main.ts                  # Application entry point
│   │
│   ├── user/                    # User management module
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.module.ts
│   │   └── dto/
│   │       ├── request/         # Request DTOs
│   │       └── response/        # Response DTOs
│   │
│   ├── account/                 # Account management module
│   │   ├── account.controller.ts
│   │   ├── account.service.ts
│   │   ├── account.module.ts
│   │   └── dto/
│   │       ├── request/
│   │       └── response/
│   │
│   └── transaction/             # Transaction management module
│       ├── transaction.controller.ts
│       ├── transaction.service.ts
│       ├── transaction.module.ts
│       └── dto/
│           ├── request/
│           └── response/
│
├── prisma/                      # Database configuration
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Database seeding
│   └── migrations/             # Database migrations
│
├── test/                       # Test files
│   ├── app.e2e-spec.ts        # End-to-end tests
│   └── jest.setup.ts          # Test configuration
│
└── Configuration files (package.json, tsconfig.json, etc.)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Database (PostgreSQL recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/revou-fsse-feb25/milestone-4-rifkykurniawanp.git
   cd milestone-4-rifkykurniawanp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database connection and other configs
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

### Environment Variables

```env
DATABASE_URL="your-database-connection-string"
PORT=3000
# Add other environment variables as needed
```

## 📚 API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Accounts
- `GET /accounts` - Get all accounts
- `GET /accounts/:id` - Get account by ID
- `POST /accounts` - Create new account
- `PUT /accounts/:id` - Update account
- `DELETE /accounts/:id` - Delete account

### Transactions
- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get transaction by ID
- `POST /transactions` - Create new transaction
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

For detailed API documentation with request/response schemas, visit the [Swagger UI](https://revobank.up.railway.app/api).

## 🗄️ Database Schema

The application uses Prisma ORM with the following main entities:

- **User**: User information and authentication
- **Account**: Bank accounts belonging to users
- **Transaction**: Financial transactions between accounts

Check `prisma/schema.prisma` for the complete database schema.

## 🧪 Testing

The project includes comprehensive testing setup:

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test Structure

- Unit tests for individual services and controllers
- E2E tests for complete API workflows
- Mocking and test utilities in `test/` directory

## 🚀 Deployment

This application is deployed on Railway with the following configuration:

### Railway Configuration

The `railway.json` file contains deployment settings:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start:prod"
  }
}
```

### Deployment Steps

1. Connect your GitHub repository to Railway
2. Set up environment variables in Railway dashboard
3. Configure database (Railway provides PostgreSQL)
4. Deploy automatically on push to main branch

### Production URL

🌐 **Live API**: [https://revobank.up.railway.app/](https://revobank.up.railway.app/)

## 📖 Documentation

- **API Documentation**: Available at `/api` endpoint with Swagger UI
- **Code Documentation**: Generated with TypeDoc (if configured)
- **Database Documentation**: Prisma schema serves as documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code structure and naming conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 Scripts

```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode

# Production
npm run build             # Build the application
npm run start:prod        # Start in production mode

# Database
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:seed       # Seed the database

# Code Quality
npm run lint              # Run ESLint
npm run format            # Format code with Prettier

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:cov         # Run tests with coverage
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rifky Kurniawan P**
- GitHub: [@rifkykurniawanp](https://github.com/revou-fsse-feb25/milestone-4-rifkykurniawanp)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Railway](https://railway.app/) for seamless deployment
- RevoU for the learning opportunity

---

⭐ **Star this repository if you find it helpful!**