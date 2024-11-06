-- CreateTable
CREATE TABLE "adocoes" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER,
    "adotante_id" INTEGER,
    "data_adocao" DATE NOT NULL,

    CONSTRAINT "adocoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adotantes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(50),
    "endereco" TEXT,

    CONSTRAINT "adotantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "especie" VARCHAR(255) NOT NULL,
    "raca" VARCHAR(255) NOT NULL,
    "sexo" VARCHAR(50) NOT NULL,
    "tamanho" VARCHAR(50) NOT NULL,
    "personalidade" VARCHAR(255),
    "data_nascimento" TIMESTAMP(3),
    "descricao" TEXT,
    "status" VARCHAR(50) NOT NULL,
    
    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adotantes_email_key" ON "adotantes"("email");

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_adotante_id_fkey" FOREIGN KEY ("adotante_id") REFERENCES "adotantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
