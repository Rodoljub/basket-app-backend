/*
  Warnings:

  - Added the required column `driverId` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Movement" ADD COLUMN     "driverId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Movement" ADD CONSTRAINT "Movement_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
