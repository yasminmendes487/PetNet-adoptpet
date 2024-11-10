import prisma from "../database/PrismaClient.js";

export default class AdocaoService {
  async findPetById(petId) {
    if (isNaN(petId)) {
      throw new Error("ID do pet inválido");
    }

    return await prisma.pets.findUnique({
      where: { id: Number(petId) },
    });
  }

  async findAdotanteById(adotanteId) {
    if (isNaN(adotanteId)) {
      throw new Error("ID do adotante inválido");
    }

    return await prisma.adotantes.findUnique({
      where: { id: Number(adotanteId) },
    });
  }

  async createAdoption(petId, adotanteId) {
    try {
      if (isNaN(petId) || isNaN(adotanteId)) {
        throw new Error("IDs de pet ou adotante inválidos");
      }

      const pet = await this.findPetById(petId);
      if (!pet) {
        throw new Error("Pet não encontrado");
      }

      const adotante = await this.findAdotanteById(adotanteId);
      if (!adotante) {
        throw new Error("Adotante não encontrado");
      }

      return await prisma.adocoes.create({
        data: {
          petId: Number(petId),
          adotanteId: Number(adotanteId),
          dataAdocao: new Date(),
        },
      });
    } catch (error) {
      console.error("Erro ao criar adoção:", error);
      throw new Error("Falha ao criar adoção: " + error.message);
    }
  }

  async updatePetStatus(petId, status) {
    if (isNaN(petId)) {
      throw new Error("ID do pet inválido");
    }

    const pet = await this.findPetById(petId);
    if (!pet) {
      throw new Error("Pet não encontrado");
    }

    return await prisma.pets.update({
      where: { id: Number(petId) },
      data: { status },
    });
  }
}
