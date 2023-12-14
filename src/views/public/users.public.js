document
  .getElementById("submit")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    try {
      const email = document.getElementById("email").value;
      const nickname = document.getElementById("nickname").value;
      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById("passwordConfirm").value;

      await axios.post("/api/users/signup", {
        email: email,
        nickname: nickname,
        password: password,
        passwordConfirm: passwordConfirm,
        role: true,
      });
      alert("등록완료!");

      console.log("나야", email);
    } catch (error) {
      console.error(error);
    }
  });

// document
//   .getElementById("auth-submit")
//   .addEventListener("click", async function () {
//     try {
//       const email = document.getElementById("email").value;

//       const result = await axios.post("/api/email-check", {
//         email,
//       });
//       //   A = result.data.authNumber;
//       const authNumber = prompt("인증번호 입력하셈");
//     } catch (error) {
//       console.error(error);
//     }
//   });
// let A;

// axios.defaults.withCredentials = true;
// document.querySelector("#users").addEventListener("submit", function (event) {
//   event.preventDefault();

//   var email = document.getElementById("email").value;
//   var password = document.getElementById("newPassword").value;
//   var passwordConfirm = document.getElementById("passwordConfirm").value;
//   var nickname = document.getElementById("nickname").value;

//   axios
//     .post("/api/signup", {
//       email: email,
//       password: password,
//       passwordConfirm: passwordConfirm,
//       nickname: nickname,
//     })
//     .then(function (response) {
//       alert(response.data.message || "도원결의 성공!");

//       window.location.href = "index.html";
//     })
//     .catch(function (error) {
//       if (error.response) {
//         alert(error.response.data.message);
//       } else {
//         alert(" 방해공작 발생! 다시 시도해주세요.");
//       }
//     });
// });
