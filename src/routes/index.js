import { Router } from "express";
import { petsRoutes } from "./PetRoutes.js";

const router = Router();

router.use('/pets', petsRoutes);

export { router }

