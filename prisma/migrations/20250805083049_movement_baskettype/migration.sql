/*
  Warnings:

  - Added the required column `basketType` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Movement" ADD COLUMN     "basketType" "public"."BasketType" NOT NULL;
