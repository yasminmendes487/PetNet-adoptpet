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
}
