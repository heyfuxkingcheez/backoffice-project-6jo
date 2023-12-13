export class UsersRepository {
  createOne = async ({ email, password, nickname }) => {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = await prisma.users.create({
      data: { email, password: hashedPassword, nickname },
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
