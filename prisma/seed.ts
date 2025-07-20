import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  const moderatorPassword = await bcrypt.hash('moderator123', 10);

  // 2. Create Users
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });

  const moderator = await prisma.user.create({
    data: {
      name: 'Moderator User',
      email: 'moderator@example.com',
      password: moderatorPassword,
      role: 'MODERATOR',
      isActive: true,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
      isActive: true,
    },
  });

  // 3. Create Accounts with different types
  const adminCheckingAccount = await prisma.account.create({
    data: {
      name: 'Admin Checking',
      type: 'CHECKING',
      status: 'ACTIVE',
      balance: '1000.00',
      currency: 'USD',
      userId: admin.id,
    },
  });

  const adminSavingsAccount = await prisma.account.create({
    data: {
      name: 'Admin Savings',
      type: 'SAVINGS',
      status: 'ACTIVE',
      balance: '5000.00',
      currency: 'USD',
      userId: admin.id,
    },
  });

  const moderatorAccount = await prisma.account.create({
    data: {
      name: 'Moderator Checking',
      type: 'CHECKING',
      status: 'ACTIVE',
      balance: '750.00',
      currency: 'USD',
      userId: moderator.id,
    },
  });

  const userCheckingAccount = await prisma.account.create({
    data: {
      name: 'User Checking',
      type: 'CHECKING',
      status: 'ACTIVE',
      balance: '500.00',
      currency: 'USD',
      userId: user.id,
    },
  });

  const userSavingsAccount = await prisma.account.create({
    data: {
      name: 'User Savings',
      type: 'SAVINGS',
      status: 'ACTIVE',
      balance: '1200.00',
      currency: 'USD',
      userId: user.id,
    },
  });

  const userLoanAccount = await prisma.account.create({
    data: {
      name: 'User Car Loan',
      type: 'LOAN',
      status: 'ACTIVE',
      balance: '-15000.00', // Negative balance for loan
      currency: 'USD',
      userId: user.id,
    },
  });

  // 4. Create Transactions with categories and statuses
  await prisma.transaction.createMany({
    data: [
      // Admin transactions
      {
        amount: '2500.00',
        type: 'INCOME',
        category: 'Salary',
        description: 'Monthly Salary',
        reference: 'SAL-2024-001',
        status: 'COMPLETED',
        accountId: adminCheckingAccount.id,
      },
      {
        amount: '200.00',
        type: 'TRANSFER',
        category: 'Savings',
        description: 'Transfer to Savings',
        reference: 'TRF-2024-001',
        status: 'COMPLETED',
        accountId: adminCheckingAccount.id,
      },
      {
        amount: '150.25',
        type: 'EXPENSE',
        category: 'Shopping',
        description: 'Office Supplies',
        reference: 'EXP-2024-001',
        status: 'COMPLETED',
        accountId: adminCheckingAccount.id,
      },
      
      // Moderator transactions
      {
        amount: '1800.00',
        type: 'INCOME',
        category: 'Salary',
        description: 'Monthly Salary',
        reference: 'SAL-2024-002',
        status: 'COMPLETED',
        accountId: moderatorAccount.id,
      },
      {
        amount: '75.50',
        type: 'EXPENSE',
        category: 'Food',
        description: 'Lunch Meeting',
        reference: 'EXP-2024-002',
        status: 'COMPLETED',
        accountId: moderatorAccount.id,
      },

      // User transactions
      {
        amount: '1500.00',
        type: 'INCOME',
        category: 'Freelance',
        description: 'Freelance Project Payment',
        reference: 'INC-2024-001',
        status: 'COMPLETED',
        accountId: userCheckingAccount.id,
      },
      {
        amount: '300.00',
        type: 'TRANSFER',
        category: 'Savings',
        description: 'Monthly Savings',
        reference: 'TRF-2024-002',
        status: 'COMPLETED',
        accountId: userCheckingAccount.id,
      },
      {
        amount: '125.00',
        type: 'EXPENSE',
        category: 'Food',
        description: 'Groceries',
        reference: 'EXP-2024-003',
        status: 'COMPLETED',
        accountId: userCheckingAccount.id,
      },
      {
        amount: '65.75',
        type: 'EXPENSE',
        category: 'Transport',
        description: 'Gas Station',
        reference: 'EXP-2024-004',
        status: 'COMPLETED',
        accountId: userCheckingAccount.id,
      },
      {
        amount: '500.00',
        type: 'EXPENSE',
        category: 'Loan Payment',
        description: 'Car Loan Payment',
        reference: 'LOAN-2024-001',
        status: 'COMPLETED',
        accountId: userLoanAccount.id,
      },

      // Some pending transactions
      {
        amount: '80.00',
        type: 'EXPENSE',
        category: 'Utilities',
        description: 'Electricity Bill',
        reference: 'UTIL-2024-001',
        status: 'PENDING',
        accountId: userCheckingAccount.id,
      },
      {
        amount: '250.00',
        type: 'INCOME',
        category: 'Bonus',
        description: 'Performance Bonus',
        reference: 'BON-2024-001',
        status: 'PENDING',
        accountId: adminCheckingAccount.id,
      },
    ],
  });

  console.log('📊 Seed Summary:');
  console.log(`👥 Users created: ${await prisma.user.count()}`);
  console.log(`🏦 Accounts created: ${await prisma.account.count()}`);
  console.log(`💳 Transactions created: ${await prisma.transaction.count()}`);
  console.log('');
  console.log('🔑 Login Credentials:');
  console.log('Admin: admin@example.com / admin123');
  console.log('Moderator: moderator@example.com / moderator123');
  console.log('User: user@example.com / user123');
}

main()
  .then(() => {
    console.log('🌱 Seeding complete.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    console.error(e);
    return prisma.$disconnect();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });