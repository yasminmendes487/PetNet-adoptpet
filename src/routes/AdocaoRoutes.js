import { Router } from "express";
import AdocaoController from "../controllers/AdocaoController.js";

const adocaoRoutes = Router();
const adocaoController = new AdocaoController();

adocaoRoutes.post('/', adocaoController.adoptPet);

export { adocaoRoutes }