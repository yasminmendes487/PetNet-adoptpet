import Adotante from "../models/Adotante.js";
import moment from 'moment-timezone'; // Importar a biblioteca moment-timezone

class AdotantesController {
  // Método para criar um novo adotante
  async saveAdotante(req, res) {
    try {
      // Obter a data e hora atual no fuso horário de São Paulo
      const nowInBrazil = moment().tz("America/Sao_Paulo").toDate(); // Usar toDate() para obter um objeto Date

      // Logar a data e hora obtidas
      console.log("Agora em São Paulo: ", nowInBrazil); // Adicionando o log para verificar a data e hora

      // Criar o adotante com a data de criação e atualização
      const adotante = await Adotante.create({
        ...req.body, // espalha os dados do adotante
        createdAt: nowInBrazil, // Usar o horário ajustado
        updatedAt: nowInBrazil  // Usar o horário ajustado
      });
      res.status(201).json(adotante);
    } catch (error) {
      res.status(500).json({ message: "Erro ao salvar adotante", error });
    }
  }

  // Método para listar todos os adotantes
  async listAdotantes(req, res) {
    try {
      const adotantes = await Adotante.findAll();
      res.status(200).json(adotantes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar adotantes", error });
    }
  }

  // Método para encontrar um adotante pelo ID
  async findAdotanteById(req, res) {
    try {
      const { id } = req.params;
      const adotante = await Adotante.findByPk(id);
      if (adotante) {
        res.status(200).json(adotante);
      } else {
        res.status(404).json({ message: "Adotante não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar adotante", error });
    }
  }

  // Método para atualizar um adotante pelo ID
  async updateAdotante(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Adotante.update(req.body, {
        where: { id },
      });
      if (updated) {
        const updatedAdotante = await Adotante.findByPk(id);
        res.status(200).json(updatedAdotante);
      } else {
        res.status(404).json({ message: "Adotante não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar adotante", error });
    }
  }

  // Método para deletar um adotante pelo ID
  async deleteAdotante(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Adotante.destroy({
        where: { id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Adotante não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar adotante", error });
    }
  }
}

export default AdotantesController;
