/*
  Warnings:

  - The values [PRO] on the enum `ContractStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContractStatus_new" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRING', 'DRAFT');
ALTER TABLE "Contract" ALTER COLUMN "status" TYPE "ContractStatus_new" USING ("status"::text::"ContractStatus_new");
ALTER TYPE "ContractStatus" RENAME TO "ContractStatus_old";
ALTER TYPE "ContractStatus_new" RENAME TO "ContractStatus";
DROP TYPE "ContractStatus_old";
COMMIT;

-- AlterEnum
ALTER TYPE "InvoiceStatus" ADD VALUE 'CANCELED';

-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "contractType" SET DEFAULT 'VIRTUAL';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "coveredMonths" TEXT[];
