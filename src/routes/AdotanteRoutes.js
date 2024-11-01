import { Router } from "express";
import AdotanteController from "../controllers/AdotanteController";

const adotanteRoutes = Router();
const adotantesController = new AdotanteController();

adotanteRoutes.post('/', adotantesController.createAdotante);
adotanteRoutes.get('/', adotantesController.listAdotantes);
adotanteRoutes.get('/:id', adotantesController.FindByNameAdotante); 

export { RoutesAdotantes }