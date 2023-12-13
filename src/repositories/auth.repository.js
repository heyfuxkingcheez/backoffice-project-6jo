import { prisma } from "../utils/prisma/index.js";

export class AuthRepository {
  findExistUser = async (email) => {
    const isExistUser = await prisma.Users.findUnique({
      where: { email },
    });
    await prisma.$disconnect();
    return isExistUser;
  };
}
