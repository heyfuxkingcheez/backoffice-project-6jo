import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma/index.js";

export class UsersRepository {
  createOne = async (email, nickname, password, role) => {
    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
        role,
        points: { create: { income: 0, expense: 0 } },
      },
    });

    delete newUser.password;

    return newUser;
  };

  readOneById = async (id) => {
    const user = await prisma.users.findUnique({ where: { id } });

    return user;
  };

  readOneByEmail = async (email) => {
    const user = await prisma.users.findUnique({ where: { email } });

    return user;
  };
}
