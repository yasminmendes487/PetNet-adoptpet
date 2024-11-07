
import { Router } from "express";
import { petsRoutes } from "./PetRoutes.js";
import { adotantesRoutes } from "./AdotantesRoutes.js";
import { adocaoRoutes } from "./AdocaoRoutes.js";

const router = Router();
router.use('/pets', petsRoutes);
router.use('/adotantes', adotantesRoutes);
router.use('/adocao', adocaoRoutes);

export { router }