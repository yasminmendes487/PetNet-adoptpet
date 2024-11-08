import prisma from "../database/PrismaClient.js";

export default class UsersService {
  async createUser(user) {
    return await prisma.Usuario.create({
      data: {
        ...user
      }
    });
  }
}
