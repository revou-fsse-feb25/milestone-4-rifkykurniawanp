import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 🔐 Hash Passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // 👤 Create or Update Users
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

  // 🏦 Create Accounts
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

  // 💸 Create Transactions (skip if already seeded)
  const existingTx = await prisma.transaction.findFirst();
  if (!existingTx) {
    await prisma.transaction.createMany({
      data: [
        // Deposit to Admin
        {
          amount: 2000.00,
          type: 'DEPOSIT',
          category: 'Salary',
          description: 'Admin monthly salary',
          reference: 'TXN-ADM-001',
          status: 'COMPLETED',
          toAccountId: adminAccount.id,
        },
        // Deposit to User
        {
          amount: 1000.00,
          type: 'DEPOSIT',
          category: 'Freelance',
          description: 'Freelance income',
          reference: 'TXN-USER-001',
          status: 'COMPLETED',
          toAccountId: userChecking.id,
        },
        // Transfer from Checking to Savings
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
        // Withdrawal from Checking
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

  // 📊 Summary
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
