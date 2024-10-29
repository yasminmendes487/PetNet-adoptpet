import { Router } from "express";
import PetsController from "../controllers/PetsController.js";

const petsRoutes = Router();
const petsController = new PetsController();

petsRoutes.post('/', petsController.savePet);
petsRoutes.get('/', petsController.listPets);

export { petsRoutes }