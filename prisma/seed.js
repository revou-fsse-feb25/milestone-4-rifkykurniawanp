"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@example.com',
            password: adminPassword,
            role: 'ADMIN',
            isActive: true,
        },
    });
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            name: 'Regular User',
            email: 'user@example.com',
            password: userPassword,
            role: 'USER',
            isActive: true,
        },
    });
    const adminAccount = await prisma.account.upsert({
        where: { userId_name: { userId: admin.id, name: 'Admin Checking' } },
        update: {},
        create: {
            name: 'Admin Checking',
            type: 'CHECKING',
            status: 'ACTIVE',
            balance: 5000.00,
            currency: 'USD',
            userId: admin.id,
        },
    });
    const userChecking = await prisma.account.upsert({
        where: { userId_name: { userId: user.id, name: 'User Checking' } },
        update: {},
        create: {
            name: 'User Checking',
            type: 'CHECKING',
            status: 'ACTIVE',
            balance: 1200.00,
            currency: 'USD',
            userId: user.id,
        },
    });
    const userSavings = await prisma.account.upsert({
        where: { userId_name: { userId: user.id, name: 'User Savings' } },
        update: {},
        create: {
            name: 'User Savings',
            type: 'SAVINGS',
            status: 'ACTIVE',
            balance: 3000.00,
            currency: 'USD',
            userId: user.id,
        },
    });
    const existingTx = await prisma.transaction.findFirst();
    if (!existingTx) {
        await prisma.transaction.createMany({
            data: [
                {
                    amount: 2000.00,
                    type: 'DEPOSIT',
                    category: 'Salary',
                    description: 'Admin monthly salary',
                    reference: 'TXN-ADM-001',
                    status: 'COMPLETED',
                    toAccountId: adminAccount.id,
                },
                {
                    amount: 1000.00,
                    type: 'DEPOSIT',
                    category: 'Freelance',
                    description: 'Freelance income',
                    reference: 'TXN-USER-001',
                    status: 'COMPLETED',
                    toAccountId: userChecking.id,
                },
                {
                    amount: 500.00,
                    type: 'TRANSFER',
                    category: 'Savings',
                    description: 'Transfer to savings',
                    reference: 'TXN-USER-002',
                    status: 'COMPLETED',
                    fromAccountId: userChecking.id,
                    toAccountId: userSavings.id,
                },
                {
                    amount: 200.00,
                    type: 'WITHDRAW',
                    category: 'Groceries',
                    description: 'Grocery shopping',
                    reference: 'TXN-USER-003',
                    status: 'COMPLETED',
                    fromAccountId: userChecking.id,
                },
            ],
        });
    }
    console.log('✅ Seeding completed successfully');
    console.log('👥 Users:', await prisma.user.count());
    console.log('🏦 Accounts:', await prisma.account.count());
    console.log('💸 Transactions:', await prisma.transaction.count());
    console.log('');
    console.log('🔐 Logins:');
    console.log('  Admin    ➜ admin@example.com / admin123');
    console.log('  Customer ➜ user@example.com / user123');
}
main()
    .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
