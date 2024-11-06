import Adotante from "../models/Adotante.js";
import moment from 'moment-timezone';

class AdotantesController {
  async saveAdotante(req, res) {
    try {
      const nowInBrazil = moment().tz("America/Sao_Paulo").toDate();
      console.log("Agora em São Paulo: ", nowInBrazil);

      const adotante = await Adotante.create({
        ...req.body,
        createdAt: nowInBrazil,
        updatedAt: nowInBrazil
      });
      res.status(201).json(adotante);
    } catch (error) {
      res.status(500).json({ message: "Erro ao salvar adotante", error });
    }
  }

  async listAdotantes(req, res) {
    try {
      const adotantes = await Adotante.findAll();
      res.status(200).json(adotantes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar adotantes", error });
    }
  }

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

