import prisma from '../database/PrismaClient.js';
import { PetStatus } from '../utils/petStatus.js';

export default class PetsController {
  async savePet (req, res) {
    
    try {
      const { nome, especie, idade, descricao, status } = req.body;

      const newPet = await prisma.pets.create({
        data: {
          nome, especie, descricao, idade, status: PetStatus.ADOPTED
        }
      });
      return res.status(201).json(newPet);
    } catch(error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async listPets (req, res) {
    
    try {
      const pets = await prisma.pets.findMany();
      return res.status(200).json(pets);
    } catch(error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
