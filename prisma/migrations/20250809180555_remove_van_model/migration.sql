/*
  Warnings:

  - You are about to drop the `Van` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Driver" DROP CONSTRAINT "Driver_vanId_fkey";

-- DropTable
DROP TABLE "public"."Van";

-- AddForeignKey
ALTER TABLE "public"."Driver" ADD CONSTRAINT "Driver_vanId_fkey" FOREIGN KEY ("vanId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
