//src/routes/PetRoutes.js
import { Router } from "express";
import PetsController from "../controllers/PetsController.js"; 

const router = Router();
const petsController = new PetsController();


router.post('/', petsController.savePet);  
router.get('/', petsController.listPets);  
router.get('/:id', petsController.findPetById);  
router.put('/:id', petsController.updatePet);  
router.delete('/:id', petsController.deletePet);  

export default router; 
