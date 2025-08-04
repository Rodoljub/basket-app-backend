/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the `Transfer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_fromId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer" DROP CONSTRAINT "Transfer_toId_fkey";

-- AlterTable
ALTER TABLE "public"."Place" DROP COLUMN "createdAt";

-- DropTable
DROP TABLE "public"."Transfer";

-- CreateTable
CREATE TABLE "public"."Route" (
    "id" SERIAL NOT NULL,
    "driverName" TEXT NOT NULL,
    "vanId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RouteStore" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    "order" INTEGER,

    CONSTRAINT "RouteStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BasketMove" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BasketMove_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Place_type_idx" ON "public"."Place"("type");

-- AddForeignKey
ALTER TABLE "public"."Route" ADD CONSTRAINT "Route_vanId_fkey" FOREIGN KEY ("vanId") REFERENCES "public"."Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RouteStore" ADD CONSTRAINT "RouteStore_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RouteStore" ADD CONSTRAINT "RouteStore_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BasketMove" ADD CONSTRAINT "BasketMove_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BasketMove" ADD CONSTRAINT "BasketMove_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "public"."Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BasketMove" ADD CONSTRAINT "BasketMove_toId_fkey" FOREIGN KEY ("toId") REFERENCES "public"."Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
