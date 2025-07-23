/*
  Warnings:

  - The values [SUSPENDED] on the enum `AccountStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [LOAN,CREDIT_CARD,INVESTMENT] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANCELLED] on the enum `TransactionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [INCOME,EXPENSE] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MODERATOR] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `account_id` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountStatus_new" AS ENUM ('ACTIVE', 'INACTIVE', 'CLOSED');
ALTER TABLE "accounts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "accounts" ALTER COLUMN "status" TYPE "AccountStatus_new" USING ("status"::text::"AccountStatus_new");
ALTER TYPE "AccountStatus" RENAME TO "AccountStatus_old";
ALTER TYPE "AccountStatus_new" RENAME TO "AccountStatus";
DROP TYPE "AccountStatus_old";
ALTER TABLE "accounts" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('CHECKING', 'SAVINGS');
ALTER TABLE "accounts" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "accounts" ALTER COLUMN "type" TYPE "AccountType_new" USING ("type"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "AccountType_old";
ALTER TABLE "accounts" ALTER COLUMN "type" SET DEFAULT 'CHECKING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');
ALTER TABLE "transactions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "transactions" ALTER COLUMN "status" TYPE "TransactionStatus_new" USING ("status"::text::"TransactionStatus_new");
ALTER TYPE "TransactionStatus" RENAME TO "TransactionStatus_old";
ALTER TYPE "TransactionStatus_new" RENAME TO "TransactionStatus";
DROP TYPE "TransactionStatus_old";
ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT 'COMPLETED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSFER');
ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'USER');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_fkey";

-- DropIndex
DROP INDEX "accounts_name_idx";

-- DropIndex
DROP INDEX "accounts_status_idx";

-- DropIndex
DROP INDEX "accounts_type_idx";

-- DropIndex
DROP INDEX "transactions_account_id_idx";

-- DropIndex
DROP INDEX "transactions_category_idx";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "account_id",
ADD COLUMN     "from_account_id" INTEGER,
ADD COLUMN     "to_account_id" INTEGER;

-- CreateIndex
CREATE INDEX "transactions_from_account_id_idx" ON "transactions"("from_account_id");

-- CreateIndex
CREATE INDEX "transactions_to_account_id_idx" ON "transactions"("to_account_id");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
