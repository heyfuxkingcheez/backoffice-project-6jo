axios.defaults.withCredentials = true;
document.querySelector("#users").addEventListener("submit", function (event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("newPassword").value;
  var passwordConfirm = document.getElementById("passwordConfirm").value;
  var nickname = document.getElementById("nickname").value;

  axios
    .post("/api/signup", {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      nickname: nickname,
    })
    .then(function (response) {
      alert(response.data.message || "도원결의 성공!");

      window.location.href = "index.html";
    })
    .catch(function (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(" 방해공작 발생! 다시 시도해주세요.");
      }
    });
});
