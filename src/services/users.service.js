import { UsersRepository } from "../repositories/users.repository.js";

export class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  signup = async (email, nickname, password, role) => {
    const existsUserEmail = await this.usersRepository.readOneByEmail(email);
    if (existsUserEmail) {
      return res.status(405).json({
        success: false,
        message: "이미 가입 된 이메일",
      });
    }

    const newUser = await this.usersRepository.createOne(
      email,
      nickname,
      password,
      role
    );

    return {
      success: true,
      message: "가입 성공",
      data: newUser,
    };
  };
}
