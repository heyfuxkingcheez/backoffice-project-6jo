import { AuthService } from "../services/auth.services.js";

export class AuthController {
  authService = new AuthService();

  // 로그인
  LogIn = async (req, res) => {
    try {
      const { email, password } = await req.body;

      const user = await this.authService.logIn(email, password);

      const token = user.token;
      const name = user.nickname;
      let expires = new Date(Date.now() + 1440 * 60000);
      res.cookie("role", user.role);
      res.cookie("authorization", `Bearer ${token}`, {
        expires: expires,
      });
      res
        .status(200)
        .json({ success: true, message: "로그인 성공", data: user });
    } catch (err) {
      console.log(err);
      res.status(401).json({ success: false, message: err.message });
    }
  };

  // 로그아웃
  LogOut = async (req, res) => {
    try {
      res.clearCookie("authorization");
      res.clearCookie("role");
      res.status(200).json({ success: true, message: "로그아웃 성공" });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  };
}
