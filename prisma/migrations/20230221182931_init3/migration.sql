/*
  Warnings:

  - A unique constraint covering the columns `[id,productId]` on the table `Update` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,updateId]` on the table `updatePoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Update_id_productId_key" ON "Update"("id", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "updatePoint_id_updateId_key" ON "updatePoint"("id", "updateId");
