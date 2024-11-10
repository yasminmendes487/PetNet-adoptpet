//src/routes/AdotantesRoutes.js
import { Router } from "express";
import AdotantesController from "../controllers/AdotantesController.js";
import { verificarAutenticacao } from "../middlewares/authMiddleware.js";

const adotantesRoutes = Router();
const adotantesController = new AdotantesController();


adotantesRoutes.post('/', verificarAutenticacao, adotantesController.saveAdotante);
adotantesRoutes.get('/', adotantesController.listAdotantes);
adotantesRoutes.get('/:id', adotantesController.findAdotanteById);
adotantesRoutes.put('/:id', verificarAutenticacao, adotantesController.updateAdotante);
adotantesRoutes.delete('/:id',verificarAutenticacao, adotantesController.deleteAdotante);

export { adotantesRoutes };
