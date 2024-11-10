import AdocaoService from "../services/adocao.service.js";
import { PetStatus } from "../utils/petStatus.js";


const adocaoService = new AdocaoService();

export default class AdocaoController {
  async adoptPet(req, res) {
    const { pet_id, adotante_id } = req.body;

    
    if (!pet_id || !adotante_id) {
      return res.status(400).json({
        error: "Os campos 'pet_id' e 'adotante_id' são obrigatórios",
      });
    }

    try {
      
      const pet = await adocaoService.findPetById(pet_id);
      if (!pet) {
        return res.status(404).json({ error: "Pet não encontrado" });
      }

      if (pet.status === PetStatus.ADOPTED) {
        return res
          .status(400)
          .json({ error: "Este pet já foi adotado" });
      }

     
      const adotante = await adocaoService.findAdotanteById(adotante_id);
      if (!adotante) {
        return res
          .status(404)
          .json({ error: "Adotante não encontrado" });
      }

     
      const adoption = await adocaoService.createAdoption(pet_id, adotante_id);
      const petUpdate = await adocaoService.updatePetStatus(pet_id, PetStatus.ADOPTED);

     
      return res.status(201).json({
        message: "Adoção realizada com sucesso",
        data: { adoption, pet: petUpdate },
      });
    } catch (error) {
      console.error("Erro no processo de adoção:", error);
      return res.status(500).json({
        error: "Erro interno no processo de adoção",
        message: error.message,
      });
    }
  }
}