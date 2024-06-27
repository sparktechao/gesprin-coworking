/*
  Warnings:

  - Added the required column `reference` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "reference" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "InvoiceStatus" NOT NULL;
