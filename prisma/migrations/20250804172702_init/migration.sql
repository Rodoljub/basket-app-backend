-- CreateEnum
CREATE TYPE "public"."PlaceType" AS ENUM ('STORE', 'VAN', 'WAREHOUSE');

-- CreateTable
CREATE TABLE "public"."Place" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."PlaceType" NOT NULL,
    "baskets" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transfer" (
    "id" SERIAL NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Transfer" ADD CONSTRAINT "Transfer_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "public"."Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transfer" ADD CONSTRAINT "Transfer_toId_fkey" FOREIGN KEY ("toId") REFERENCES "public"."Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
