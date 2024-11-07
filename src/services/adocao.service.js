import prisma from "../database/PrismaClient.js";

export default class AdocaoService {
  async findPetById(pet_id) {
    return await prisma.pets.findUnique({
      where: { id: Number(pet_id) }
    });
  }

  async findAdotanteById(adotante_id) {
    return await prisma.adotantes.findUnique({
      where: { id: Number(adotante_id) }
    });
  }

  async createAdoption(pet_id, adotante_id) {
    return await prisma.adocoes.create({
      data: {
        pet_id: Number(pet_id),
        adotante_id: Number(adotante_id),
        data_adocao: new Date(),
      }
    });
  }

  async updatePetStatus(pet_id, status) {
    return await prisma.pets.update({
      where: { id: Number(pet_id) },
      data: { status }
    });
  }
}