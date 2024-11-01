import { Router } from "express";
import AdotanteController from "../controllers/AdotanteController";

const adotanteRoutes = Router();
const adotantesController = new AdotanteController();

// TODO: Criar Métodos 
adotanteRoutes.post('/', adotantesController.createAdotante);
adotanteRoutes.get('/', adotantesController.listAdotantes);
adotanteRoutes.get('/:name', adotantesController.FindByNameAdotante);
adotanteRoutes.put('/:id', adotantesController.updateAdotante);
adotanteRoutes.delete('/:id', adotantesController.removeAdotante);

export { RoutesAdotantes }
