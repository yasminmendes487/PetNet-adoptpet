// src/routes/index.js
import { Router } from "express";
import petsRoutes from "./PetRoutes.js"; // Rotas de pets
import adotantesRoutes from "./AdotantesRoutes.js"; // Rotas de adotantes

const router = Router();

// Usando as rotas de pets
router.use('/pets', petsRoutes);

// Usando as rotas de adotantes
router.use('/adotantes', adotantesRoutes);

export { router }; // Exportando o roteador
