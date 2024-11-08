import prisma from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";

export default class UsersService {
  async createUser(user) {
    const { nome, email, senha, tipo } = user;
    const senhaHash = bcrypt.hashSync(senha, 10);

    return await prisma.Usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        tipo
      }
    });
  }

  async getUserByEmail(email) {
    return await prisma.Usuario.findUnique({
      where: { email }
    })
  }

  async getUserById(id) {
    return await prisma.usuario.findUnique({
      omit: { senha: true }, // omite a senha do usuário
      where: { id: Number(id) }
    });
  }
}
