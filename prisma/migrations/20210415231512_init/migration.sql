/*
  Warnings:

  - Added the required column `type` to the `anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `manga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anime" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "manga" ADD COLUMN     "type" TEXT NOT NULL;
