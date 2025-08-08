-- DropForeignKey
ALTER TABLE "public"."Route" DROP CONSTRAINT "Route_driverId_fkey";

-- AlterTable
ALTER TABLE "public"."Route" ALTER COLUMN "driverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Route" ADD CONSTRAINT "Route_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
