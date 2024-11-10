-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "factoryOfficialId" INTEGER NOT NULL,
    "cropId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_factoryOfficialId_fkey" FOREIGN KEY ("factoryOfficialId") REFERENCES "FactoryOfficial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
