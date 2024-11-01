import prisma from "../database/PrismaClient.js";
import buildFilters from "../utils/filters.js";
import { PetStatus } from "../utils/petStatus.js";

export default class PetsController {
  async savePet(req, res) {
    try {
      const { nome, especie, raca, data_nascimento, descricao, tamanho, personalidade, sexo } = req.body;

      const newPet = await prisma.pets.create({
        data: {
          nome,
          especie,
          raca,
          descricao,
          data_nascimento,
          tamanho,
          personalidade,
          sexo,
          status: PetStatus.AVAILABLE,
        },
      });

      return res.status(201).json(newPet);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findPetById(req, res) {
    const { id } = req.params;

    try {
      const pet = await prisma.pets.findUnique({
        where: { id: Number(id) },
      });
      if (pet) {
        return res.status(200).json(pet);
      } else {
      return res.status(400).json({error: "Pet não encontrado"});
        }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listPets(req, res) {
    const filters = buildFilters(req.query);

    try {
      const pets = await prisma.pets.findMany({
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
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: "Pet excluído com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async updatePet(req, res) {
    const { id } = req.params;
    const { nome, especie, raca, data_nascimento, descricao, status, tamanho, personalidade, sexo } =
      req.body;

    try {
      const validStatus =
        status && Object.values(PetStatus).includes(status)
          ? status
          : undefined;

      const updatedPet = await prisma.pets.update({
        where: { id: Number(id) },
        data: {
          nome,
          especie,
          raca,
          tamanho,
          personalidade,
          sexo,
          ...(data_nascimento && { data_nascimento }),
          descricao,
          ...(validStatus && { status: validStatus }),
        },
      });

      return res.status(200).json(updatedPet);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
