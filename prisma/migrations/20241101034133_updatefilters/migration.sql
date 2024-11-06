/*
  Warnings:

  - Added the required column `personalidade` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tamanho` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "personalidade" VARCHAR(50) NOT NULL,
ADD COLUMN     "sexo" VARCHAR(50) NOT NULL,
ADD COLUMN     "tamanho" VARCHAR(50) NOT NULL;