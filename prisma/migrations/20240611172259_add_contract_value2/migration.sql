/*
  Warnings:

  - You are about to drop the column `endDate` on the `ContractValue` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `ContractValue` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ContractValue` table. All the data in the column will be lost.
  - Added the required column `amount` to the `ContractValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContractValue" DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "value",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
