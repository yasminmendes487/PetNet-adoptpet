import prisma from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";

export default class AdotantesService {
  async findAdotanteById(adotanteId) {
    if (isNaN(adotanteId)) {
      throw new Error("ID do adotante inválido");
    }

    return await prisma.adotantes.findUnique({
      where: { id: Number(adotanteId) },
    });
  }

  async saveAdotante(adotante) {
    const { nome, email, telefone, endereco, senha } = adotante;
    const senhaHash = bcrypt.hashSync(senha, 10);
    try {
      const newAdotante = await prisma.adotantes.create({
        data: { 
          nome, 
          telefone, 
          endereco,
          usuario: {
            connectOrCreate: {
              where: { email },
              create: {
                nome,
                email,
                senha: senhaHash,
                tipo: 'usuario',
              }
            }
          }
        },
      });

      return newAdotante;
    } catch (error) {
      console.error("Erro ao criar adotante:", error);
      throw new Error("Falha ao criar adotante: " + error.message);
    }
  }

  async createAdotante(petId, adotanteId) {
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

  async updateAdotante(id, adotante) {
    const { nome, email, telefone, endereco, senha } = adotante;
    const senhaHash = bcrypt.hashSync(senha, 10);
  
    try {
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
      });
  
      return await prisma.adotantes.update({
        where: { id: Number(id) },
        data: { 
          nome, 
          telefone, 
          endereco,
          usuario: usuarioExistente
            ? { connect: { email } } 
            : { 
                connectOrCreate: {
                  where: { email },
                  create: {
                    nome,
                    email,
                    senha: senhaHash,
                    tipo: 'usuario',
                  }
                } 
              },
        },
      });
      
    } catch (error) {
      console.error("Erro ao atualizar adotante:", error);
      throw new Error("Falha ao atualizar adotante: " + error.message);
    }
  }
}
