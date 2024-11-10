import prisma from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";
import AdotantesService from "../services/adotantes.service.js";

const adotantesService = new AdotantesService();

export default class AdotantesController {

  async saveAdotante(req, res) {
    try {
      const newAdotante = await adotantesService.saveAdotante(req.body);
      return res.status(201).json(newAdotante);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao criar adotante", message: error.message });
    }
  }

  async findAdotanteById(req, res) {
    const { id } = req.params;

    try {

      const adotante = await prisma.adotantes.findUnique({
        where: { id: Number(id) },
        include: {
          //Para retornos futuros
          adocoes: true,
        },
      });

      if (adotante) {
        return res.status(200).json(adotante);
      } else {
        return res.status(404).json({ error: "Adotante não encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar adotante", message: error.message });
    }
  }


  async listAdotantes(req, res) {
    try {
      const adotantes = await prisma.adotantes.findMany({
        //Para retornos futuros
        include: {
          adocoes: true,
        }
      });
      return res.status(200).json(adotantes);

    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar adotantes", message: error.message });
    }
  }


  async deleteAdotante(req, res) {
    const { id } = req.params;

    try {
      await prisma.adotantes.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: "Adotante excluído com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao excluir adotante", message: error.message });
    }
  }


  async updateAdotante(req, res) {
    const { id } = req.params;
  
    try {
      const updatedAdotante = await adotantesService.updateAdotante(id, req.body);
      return res.status(200).json(updatedAdotante);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar adotante", message: error.message });
    }
  }
  
}
