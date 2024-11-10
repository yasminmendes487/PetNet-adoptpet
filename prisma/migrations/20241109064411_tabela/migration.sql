/*
  Warnings:

  - You are about to alter the column `nome` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `senha` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `email` on the `adotantes` table. All the data in the column will be lost.
  - You are about to alter the column `endereco` on the `adotantes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "adocoes" DROP CONSTRAINT "adocoes_adotante_id_fkey";

-- DropForeignKey
ALTER TABLE "adocoes" DROP CONSTRAINT "adocoes_pet_id_fkey";

-- DropIndex
DROP INDEX "adotantes_email_key";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "nome" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "senha" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "adotantes" DROP COLUMN "email",
ALTER COLUMN "endereco" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_adotante_id_fkey" FOREIGN KEY ("adotante_id") REFERENCES "adotantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
