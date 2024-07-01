-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Workstation" DROP CONSTRAINT "Workstation_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Workstation" DROP CONSTRAINT "Workstation_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
