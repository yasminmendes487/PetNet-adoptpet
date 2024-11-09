/*
  Warnings:

  - The `tipo` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[usuario_id]` on the table `adotantes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuario_id` to the `adotantes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UsuarioTipo" AS ENUM ('admin', 'usuario');

-- DropForeignKey
ALTER TABLE "adocoes" DROP CONSTRAINT "adocoes_adotante_id_fkey";

-- DropForeignKey
ALTER TABLE "adocoes" DROP CONSTRAINT "adocoes_pet_id_fkey";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "UsuarioTipo" NOT NULL DEFAULT 'usuario';

-- AlterTable
ALTER TABLE "adotantes" ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "data_nascimento" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "adotantes_usuario_id_key" ON "adotantes"("usuario_id");

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_adotante_id_fkey" FOREIGN KEY ("adotante_id") REFERENCES "adotantes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adotantes" ADD CONSTRAINT "adotantes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
