import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma/index.js";

export class UsersRepository {
  createOne = async (role, email, nickname, password) => {
    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = await prisma.users.create({
      data: { role, email, password: hashedPassword, nickname },
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
