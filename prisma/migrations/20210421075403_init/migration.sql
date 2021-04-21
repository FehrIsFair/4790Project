/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `list` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "list.uid_unique" ON "list"("uid");
