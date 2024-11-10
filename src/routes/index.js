import { Router } from "express";
import petsRoutes from "./PetRoutes.js"; 
import { adotantesRoutes } from "./AdotantesRoutes.js";
import { adocaoRoutes } from "./AdocaoRoutes.js";
import { usersRoutes } from "./UserRoutes.js";

const router = Router();


router.use('/pets', petsRoutes);          
router.use('/adotantes', adotantesRoutes); 
router.use('/adocao', adocaoRoutes);     
router.use('/users', usersRoutes);       

// Caso a rota não exista, retorna erro 404
router.use((req, res) => {
  return res.status(404).json({ message: "Endpoint não encontrado" });
});

export { router };
