//src/routes/UserRoutes.js

import { Router } from "express";
import UsersController from "../controllers/UsersController.js";
import { verificarAutenticacao, verificarAdmin } from "../middlewares/authMiddleware.js";

const usersRoutes = Router();
const usersController = new UsersController();


usersRoutes.post('/login', usersController.login);
usersRoutes.post('/register', usersController.createUser);
usersRoutes.get('/:id', verificarAutenticacao, usersController.findUserById);  

export { usersRoutes };
