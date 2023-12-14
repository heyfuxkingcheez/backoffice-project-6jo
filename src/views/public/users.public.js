console.log("어 그래 형이야");

document
  .getElementById("submit")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    try {
      const email = document.getElementById("email").value;
      const nickname = document.getElementById("nickname").value;
      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById("passwordConfirm").value;
      const role = false;

      await axios.post("/api/users/signup", {
        email: email,
        nickname: nickname,
        password: password,
        passwordConfirm: passwordConfirm,
        role: Boolean(role),
      });
      alert("등록완료!");
    } catch (error) {
      console.error(error);
    }
  });

document
  .getElementById("auth-submit")
  .addEventListener("click", async function () {
    try {
      const email = document.getElementById("email").value;

      const result = await axios.post("/api/email-check", {
        email,
      });

      console.log("인증번호:", result.data.authNumber);
      A = result.data.authNumber;

      alert("메일함을 확인해 주세요");
    } catch (error) {
      console.error(error);
    }
  });

let A;

document
  .getElementById("auth-check")
  .addEventListener("click", async function () {
    try {
      const authNumber = document.getElementById("authNumber").value;
      console.log("여기있니?", A);
      console.log("넌누구냐", authNumber);
      if (Number(authNumber) === Number(A)) {
        alert("이메일 인증 성공");
      } else {
        alert("이메일 인증 실패");
      }
    } catch (error) {
      console.error(error);
    }
  });
