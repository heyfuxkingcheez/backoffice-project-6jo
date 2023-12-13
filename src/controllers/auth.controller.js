import { AuthService } from "../services/auth.services.js";

export class AuthController {
  authService = new AuthService();

  LogIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await this.authService.logIn(email, password);
      const token = user.token;
      const name = user.nickname;
      let expires = new Date(Date.now() + 1440 * 60000);
      res.cookie("authorization", `Bearer ${token}`, {
        expires: expires,
      });
      res
        .status(200)
        .json({ success: true, message: "로그인 성공", name: name });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  };
  LogOut = async (req, res) => {
    try {
      res.clearCookie("authorization");
      res.status(200).json({ success: true, message: "로그아웃 성공" });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  };
}
