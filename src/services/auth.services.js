import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import { AuthRepository } from "../repositories/auth.repository.js";

const tokenKey = process.env.TOKENKEY;

export class AuthService {
  authRepository = new AuthRepository();

  // 로그인
  logIn = async (email, password) => {
    if (!Object.keys({ email, password }).length) {
      throw new Error("데이터 형식이 올바르지 않습니다.");
    }

    const user = await this.authRepository.findExistUser(email);
    console.log("user: ", user.password);

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    console.log("hashedPassword: ", hashedPassword);

    if (!user || user.password !== hashedPassword) {
      throw new Error("이메일 또는 비밀번호가 다릅니다.");
    }

    const token = jwt.sign(
      {
        userId: user.userId,
      },
      tokenKey,
      { expiresIn: "24h" }
    );
    const userName = user.nickname;
    return { userName, token };
  };
}
