import { Router } from "express";
import AdocaoController from "../controllers/AdocaoController.js";

const adocaoRoutes = Router();
const adocaoController = new AdocaoController();

adocaoRoutes.post('/', adocaoController.adoptPet);
//Necessário id do pet e do adotante pra atualizar o status do Pet. -> adopted

export { adocaoRoutes }