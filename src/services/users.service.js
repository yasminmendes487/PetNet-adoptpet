import prisma from "../database/PrismaClient.js";

export default class UsersService {
  async createUser(user) {
    return await prisma.Usuario.create({
      data: {
        ...user
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
