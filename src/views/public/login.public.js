//홈으로 이동동
document.getElementById("gohome").addEventListener("click", function () {
  window.location.href = "index.html";
});

async function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await axios({
    method: "POST",
    url: "/api/auth/login",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => {
      console.log(res);
      alert("로그인 성공!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}

const checkoutBtn = document.getElementById("submit");
checkoutBtn.addEventListener("click", logIn);
