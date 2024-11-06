import { Router } from "express";
import AdotantesController from "../controllers/AdotantesController.js";

const adotantesRoutes = Router();
const adotantesController = new AdotantesController();

adotantesRoutes.post('/', adotantesController.saveAdotante);
adotantesRoutes.get('/', adotantesController.listAdotantes);
adotantesRoutes.get('/:id', adotantesController.findAdotanteById);
adotantesRoutes.put('/:id', adotantesController.updateAdotante);
adotantesRoutes.delete('/:id', adotantesController.deleteAdotante);

export { adotantesRoutes }