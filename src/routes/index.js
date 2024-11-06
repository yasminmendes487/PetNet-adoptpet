
import { Router } from "express";
import { petsRoutes } from "./PetRoutes.js";
import { adotantesRoutes } from "./AdotantesRoutes.js";

const router = Router();
router.use('/pets', petsRoutes);
router.use('/adotantes', adotantesRoutes);

export { router }