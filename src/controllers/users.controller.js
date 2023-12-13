import { UsersService } from "../services/users.service.js";

export class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  signup = async (req, res, next) => {
    try {
      const { email, nickname, password, passwordConfirm, role } =
        await req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "잠행 나가실때 쓰실 호패(email)를 입력하여 주시옵소서.",
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message: "잠행 때 사용하실 암구호가 필요합니다.",
        });
      }

      if (!passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: "잠행 때 사용하실 암구호를 한번더 입력해주시기 바랍니다.",
        });
      }

      if (!nickname) {
        return res.status(400).json({
          success: false,
          message: "잠행 나올때 쓰실 성함을 입력해 주시옵소서 즌하",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "솔직히 주민번호 앞자리만 입력해도 6자리인데.. 비밀번호에 진심을 담아주세요 :(",
        });
      }

      let emailValidationRegex = new RegExp("[a-z0-9._]+@[a-z]+.[a-z]{2,3}");
      const isValidEmail = emailValidationRegex.test(email);
      if (!isValidEmail) {
        return res.status(400).json({
          success: false,
          message: "올바른 호패(email) 형식이 아닙니다.",
        });
      }

      const data = await this.usersService.signup(
        email,
        nickname,
        password,
        role
      );

      return res.status(201).json({
        success: true,
        message: "잠행 나가실 준비가 끝났습니다.",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
