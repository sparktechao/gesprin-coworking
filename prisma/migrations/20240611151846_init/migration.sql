/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRING');

-- CreateEnum
CREATE TYPE "NotificationPreference" AS ENUM ('SMS', 'EMAIL', 'PHONE');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('ROOM', 'DESK', 'VIRTUAL');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Coworker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "commercialCertificate" TEXT NOT NULL,
    "notificationPreferences" "NotificationPreference"[],

    CONSTRAINT "Coworker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workstation" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "stationNumber" TEXT NOT NULL,
    "contractId" TEXT,

    CONSTRAINT "Workstation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "coworkerId" TEXT NOT NULL,
    "nuc" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "contractType" "ContractType" NOT NULL,
    "previousContractId" TEXT,
    "roomId" TEXT,
    "status" "ContractStatus" NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractValue" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ContractValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrintJob" (
    "id" TEXT NOT NULL,
    "coworkerId" TEXT NOT NULL,
    "printDate" TIMESTAMP(3) NOT NULL,
    "pageCount" INTEGER NOT NULL,

    CONSTRAINT "PrintJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_WorkstationToContract" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Coworker_email_key" ON "Coworker"("email");

-- CreateIndex
CREATE INDEX "Contract_coworkerId_idx" ON "Contract"("coworkerId");

-- CreateIndex
CREATE INDEX "Contract_nuc_idx" ON "Contract"("nuc");

-- CreateIndex
CREATE INDEX "ContractValue_contractId_idx" ON "ContractValue"("contractId");

-- CreateIndex
CREATE INDEX "Invoice_contractId_idx" ON "Invoice"("contractId");

-- CreateIndex
CREATE INDEX "Payment_invoiceId_idx" ON "Payment"("invoiceId");

-- CreateIndex
CREATE INDEX "PrintJob_coworkerId_idx" ON "PrintJob"("coworkerId");

-- CreateIndex
CREATE UNIQUE INDEX "_WorkstationToContract_AB_unique" ON "_WorkstationToContract"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkstationToContract_B_index" ON "_WorkstationToContract"("B");

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_coworkerId_fkey" FOREIGN KEY ("coworkerId") REFERENCES "Coworker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractValue" ADD CONSTRAINT "ContractValue_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_coworkerId_fkey" FOREIGN KEY ("coworkerId") REFERENCES "Coworker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkstationToContract" ADD CONSTRAINT "_WorkstationToContract_A_fkey" FOREIGN KEY ("A") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkstationToContract" ADD CONSTRAINT "_WorkstationToContract_B_fkey" FOREIGN KEY ("B") REFERENCES "Workstation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
