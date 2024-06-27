-- AlterEnum
ALTER TYPE "InvoiceStatus" ADD VALUE 'OVERDUE';

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "status" SET DEFAULT 'UNPAID';
