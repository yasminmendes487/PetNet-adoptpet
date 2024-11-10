// Definição das rotas de autenticação para registrar e autenticar o usuário 

import express from 'express';
import { registrar, login } from './authController';
import { validarRegistro, validarLogin } from './authValidation';
import { verificarAuth } from './authMiddleware';

const router = express.Router();


router.post('/register', validarRegistro, registrar);


router.post('/login', validarLogin, login);


router.get('/perfil', verificarAuth, (req, res) => {
  res.send({ message: 'Perfil acessado com sucesso!', usuarioId: req.usuarioId });
});

export default router;
