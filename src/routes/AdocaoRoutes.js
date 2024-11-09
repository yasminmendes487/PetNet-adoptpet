//src/routes/AdocaoRoutes.js
import { Router } from "express";
import AdocaoController from "../controllers/AdocaoController.js";  

const adocaoRoutes = Router();
const adocaoController = new AdocaoController();


adocaoRoutes.post('/adocao', adocaoController.adoptPet); 


export { adocaoRoutes };
