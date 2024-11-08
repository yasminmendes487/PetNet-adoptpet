import { Router } from "express";
import UsersController from "../controllers/UsersController.js";
import validateToken from "../middlewares/authMiddleware.js";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post('/', usersController.createUser);
usersRoutes.post('/login', validateToken, usersController.login);
usersRoutes.get('/:id', usersController.findUserById);


export { usersRoutes }