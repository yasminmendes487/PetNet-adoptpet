import prisma from "../database/PrismaClient.js"; 
import buildFilters from "../utils/filters.js"; 
import { PetStatus } from "../utils/petStatus.js"; 

export default class PetsController {


  async savePet(req, res) {
    try {
      const { nome, especie, raca, data_nascimento, descricao, tamanho, personalidade, sexo } = req.body;

      
      const dataNascimento = new Date(data_nascimento);
      if (isNaN(dataNascimento.getTime())) {
        return res.status(400).json({ error: "Data de nascimento inválida." });
      }

      const newPet = await prisma.pets.create({
        data: {
          nome,
          especie,
          raca,
          descricao,
          data_nascimento: dataNascimento,
          tamanho,
          personalidade,
          sexo,
          status: PetStatus.AVAILABLE, 
        },
      });

      return res.status(201).json(newPet); 
    } catch (error) {
      console.error("Erro ao salvar pet:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  
  async findPetById(req, res) {
    const { id } = req.params;

    try {
      const pet = await prisma.pets.findUnique({
        where: { id: Number(id) }, // Busca o pet pelo ID
      });

      if (pet) {
        return res.status(200).json(pet); 
      } else {
        return res.status(404).json({ error: "Pet não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar pet:", error);
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
      console.error("Erro ao listar pets:", error);
      return res.status(500).json({ error: error.message });
    }
  }

 
  async deletePet(req, res) {
    const { id } = req.params;

    try {
      
      const petExists = await prisma.pets.findUnique({
        where: { id: Number(id) },
      });

      if (!petExists) {
        return res.status(404).json({ error: "Pet não encontrado" });
      }

      await prisma.pets.delete({
        where: { id: Number(id) }, 
      });

      return res.status(200).json({ message: "Pet excluído com sucesso" }); 
    } catch (error) {
      console.error("Erro ao excluir pet:", error);
      return res.status(500).json({ error: error.message });
    }
  }


  async updatePet(req, res) {
    const { id } = req.params; 
    const { nome, especie, raca, data_nascimento, descricao, status, tamanho, personalidade, sexo } = req.body;

    try {
      
      const validStatus = status && Object.values(PetStatus).includes(status) ? status : undefined;

  
      const validDataNascimento = data_nascimento ? new Date(data_nascimento) : undefined;
      if (validDataNascimento && isNaN(validDataNascimento.getTime())) {
        return res.status(400).json({ error: "Data de nascimento inválida." });
      }

      
      const petExists = await prisma.pets.findUnique({
        where: { id: Number(id) },
      });

      if (!petExists) {
        return res.status(404).json({ error: "Pet não encontrado" });
      }

     
      const updatedPet = await prisma.pets.update({
        where: { id: Number(id) },
        data: {
          nome,
          especie,
          raca,
          tamanho,
          personalidade,
          sexo,
          ...(validDataNascimento && { data_nascimento: validDataNascimento }),
          descricao,
          ...(validStatus && { status: validStatus }),
        },
      });

      return res.status(200).json(updatedPet); 
    } catch (error) {
      console.error("Erro ao atualizar pet:", error);
      return res.status(400).json({ error: error.message });
    }
  }
}
