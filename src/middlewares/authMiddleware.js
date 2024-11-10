import jwt from "jsonwebtoken";
import { secret } from "../config/jwt.js";

export const verificarAutenticacao = (req, res, next) => {
 
  if (req.path === "/api/users/login") {
    return next(); 
  }

  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
   
    const decoded = jwt.verify(token, secret);
    req.user = decoded.data; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
};

// Middleware para verificar se o usuário é um administrador
export const verificarAdmin = (req, res, next) => {
  if (!req.user || req.user.tipo !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Acesso restrito a administradores." });
  }
  next();
};
