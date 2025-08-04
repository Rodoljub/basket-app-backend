/*
  Warnings:

  - You are about to drop the column `baskets` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `driverName` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `endedAt` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `vanId` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `RouteStore` table. All the data in the column will be lost.
  - You are about to drop the `BasketMove` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `driverId` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `RouteStore` table without a default value. This is not possible if the table is not empty.
  - Made the column `order` on table `RouteStore` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."BasketMove" DROP CONSTRAINT "BasketMove_fromId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BasketMove" DROP CONSTRAINT "BasketMove_routeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BasketMove" DROP CONSTRAINT "BasketMove_toId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Route" DROP CONSTRAINT "Route_vanId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RouteStore" DROP CONSTRAINT "RouteStore_storeId_fkey";

-- DropIndex
DROP INDEX "public"."Place_type_idx";

-- AlterTable
ALTER TABLE "public"."Place" DROP COLUMN "baskets";

-- AlterTable
ALTER TABLE "public"."Route" DROP COLUMN "driverName",
DROP COLUMN "endedAt",
DROP COLUMN "startedAt",
DROP COLUMN "vanId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "driverId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."RouteStore" DROP COLUMN "storeId",
ADD COLUMN     "placeId" INTEGER NOT NULL,
ALTER COLUMN "order" SET NOT NULL;

-- DropTable
DROP TABLE "public"."BasketMove";

-- CreateTable
CREATE TABLE "public"."Basket" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vanId" INTEGER,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Van" (
    "id" SERIAL NOT NULL,
    "plateNumber" TEXT NOT NULL,

    CONSTRAINT "Van_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Inventory" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "basketId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Movement" (
    "id" SERIAL NOT NULL,
    "basketId" INTEGER NOT NULL,
    "fromPlaceId" INTEGER,
    "toPlaceId" INTEGER,
    "quantity" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_vanId_key" ON "public"."Driver"("vanId");

-- CreateIndex
CREATE UNIQUE INDEX "Van_plateNumber_key" ON "public"."Van"("plateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_placeId_basketId_key" ON "public"."Inventory"("placeId", "basketId");

-- AddForeignKey
ALTER TABLE "public"."Driver" ADD CONSTRAINT "Driver_vanId_fkey" FOREIGN KEY ("vanId") REFERENCES "public"."Van"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Route" ADD CONSTRAINT "Route_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RouteStore" ADD CONSTRAINT "RouteStore_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "public"."Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "public"."Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Movement" ADD CONSTRAINT "Movement_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "public"."Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Movement" ADD CONSTRAINT "Movement_fromPlaceId_fkey" FOREIGN KEY ("fromPlaceId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Movement" ADD CONSTRAINT "Movement_toPlaceId_fkey" FOREIGN KEY ("toPlaceId") REFERENCES "public"."Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
