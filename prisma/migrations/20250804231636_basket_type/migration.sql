/*
  Warnings:

  - You are about to drop the column `basketId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `basketId` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the `Basket` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[placeId,basketType]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `basketType` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BasketType" AS ENUM ('BIG', 'SMALL');

-- DropForeignKey
ALTER TABLE "public"."Inventory" DROP CONSTRAINT "Inventory_basketId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Movement" DROP CONSTRAINT "Movement_basketId_fkey";

-- DropIndex
DROP INDEX "public"."Inventory_placeId_basketId_key";

-- AlterTable
ALTER TABLE "public"."Inventory" DROP COLUMN "basketId",
ADD COLUMN     "basketType" "public"."BasketType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "quantity" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Movement" DROP COLUMN "basketId";

-- DropTable
DROP TABLE "public"."Basket";

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_placeId_basketType_key" ON "public"."Inventory"("placeId", "basketType");
