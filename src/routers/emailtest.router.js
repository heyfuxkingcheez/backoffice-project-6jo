import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const emailRouter = express.Router();

emailRouter.post("/email-check", async (req, res) => {
  console.log("어 맞아 형이야", req.body);
  const { email } = req.body;

  const authNumber = Math.floor(Math.random() * (10000 - 1000)) + 1000;

  if (!email)
    return res.status(400).json({
      success: false,
      massage: "요청 이메일이 없습니다.",
    });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.YOUR_EMAIL,
      pass: process.env.YOUR_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "임금님 밥상", // 발송 주체
    to: email, // 인증을 요청한 이메일 주소
    subject: "[임금님 밥상] 이메일 확인 인증번호 안내", // 이메일 제목
    text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
    인증번호 4자리 👉 ${authNumber}`, // 이메일 내용
  };

  try {
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "이메일 인증 요청에 성공하였습니다.",
      authNumber,
    });
  } catch (err) {
    console.error("emailError", err);
    res.status(500).json({
      success: false,
      message: "이메일 인증 요청에 실패하였습니다.",
    });
  }
});

export default emailRouter;
