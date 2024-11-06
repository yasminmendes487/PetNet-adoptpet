/*
  Warnings:

  - Made the column `data_nascimento` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "data_nascimento" SET NOT NULL,
ALTER TABLE "pets" ALTER COLUMN "data_nascimento" TYPE TIMESTAMP;