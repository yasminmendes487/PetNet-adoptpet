import prisma from "../database/PrismaClient.js";
import buildFilters from "../utils/filters.js";
import { PetStatus } from "../utils/petStatus.js";

export default class PetsController {
  async savePet(req, res) {
    try {
      const { nome, especie, idade, descricao } = req.body;

      const newPet = await prisma.pets.create({
        data: {
          nome,
          especie,
          descricao,
          idade,
          status: PetStatus.AVAILABLE,
        },
      });
      return res.status(201).json(newPet);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listPets(req, res) {
    const filters = buildFilters(req.query);

    try {
       const pets = await prisma.pets.findMany({
        // Se houver algum filtro lista os pets com base no filtro selecionado, 
        // caso contrário lista todos os pets
          where: Object.keys(filters).length ? filters : undefined,
        });
      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletePet(req, res) {
    const { id } = req.params;

    try {
      await prisma.pets.delete({
        where: { id: Number(id) }
      });

      return res.status(200).json({ message: "Pet excluído com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updatePet (req, res) {
    const { id } = req.params;
    const { nome, especie, idade, descricao, status } = req.body;
    try {
        const pet = await prisma.pets.update({
            data: {
                nome, especie, idade: Number(idade), descricao, status
            },
            where: { id: Number(id) }
        })
        return res.status(200).json(pet);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
}
