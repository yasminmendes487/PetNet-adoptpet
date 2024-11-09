// (criar usuário, validar login)
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../database/PrismaClient";
import { JWT_SECRET } from "../config/jwt";

export const registrarUsuario = async (
  nome,
  email,
  senha,
  tipo = "Usuario"
) => {
  const usuarioExistente = await prisma.admin.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    throw new Error("Usuário já existe.");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.admin.create({
    data: {
      nome,
      email,
      senha: senhaHash,
      tipo: tipo,
    },
  });

  return novoUsuario;
};

export const autenticarUsuario = async (email, senha) => {
  const usuario = await prisma.admin.findUnique({
    where: { email },
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error("Senha incorreta.");
  }
  const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, JWT_SECRET, {
    expiresIn: "2h",
  });

  return token;
};
