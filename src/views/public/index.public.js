// // 회원가입 이동
// document.getElementById("join").addEventListener("click", function () {
//   window.location.href = "user-page.html";
// });

// 로그인 이동
document.getElementById("login").addEventListener("click", function () {
  window.location.href = "login.html";
});

// 로그아웃 이동
document.getElementById("logout").addEventListener("click", async () => {
  try {
    // Use Axios to make a GET request to /api/auth/logout
    const response = await axios.get("/api/auth/logout");

    // Handle the response data if needed
    alert("로그아웃 성공!");

    // Reload the window after successful logout
    window.location.reload();
  } catch (error) {
    // Handle errors
    console.error("Logout failed:", error.message);
  }
  console.log("로그아웃");
});

// 사장님 등록 이동
document.getElementById("join-owner").addEventListener("click", function () {
  window.location.href = "restaurant-enroll.html";
});

// 사장님 페이지 이동
document.getElementById("owner-page").addEventListener("click", function () {
  window.location.href = "mypage-owner.html";
});

//로그인 상태일 때 버튼 숨김
const roleCookie = document.cookie
  .split(";")
  .find((cookie) => cookie.trim().endsWith("true"));
const tokenCookie = document.cookie
  .split(";")
  .find((cookie) => cookie.trim().startsWith("authorization"));

console.log(document.cookie.split(";"));
console.log(roleCookie);
console.log(tokenCookie);

// 로그인 상태 확인
if (tokenCookie) {
  // 사업자 상태 확인
  if (roleCookie) {
    document.getElementById("logout").style.display = "block";
    document.getElementById("owner-page").style.display = "block";
    document.getElementById("cart").style.display = "block";
    document.getElementById("my-page").style.display = "block";
    document.getElementById("login").style.display = "none";
  } else if (!roleCookie) {
    document.getElementById("logout").style.display = "block";
    document.getElementById("join-owner").style.display = "block";
    document.getElementById("cart").style.display = "block";
    document.getElementById("my-page").style.display = "block";
    document.getElementById("login").style.display = "none";
  } else {
  }
}

// 여러 요소에 대한 클릭 이벤트 처리
const elements = document.getElementsByClassName("row-box");
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function (event) {
    const category = event.currentTarget.getAttribute("data-categories");
    loadRestaurants(Number(category));
  });
}

// 서버로부터 데이터를 로드하는 함수
async function loadRestaurants(category) {
  // 해당 카테고리 페이지로 이동하면서 데이터도 함께 전달
  const queryString = `?category=${category}`;
  window.location.href = `restaurants-list.html${queryString}`;
}

// 유저 정보 표시
const getInfo = async () => {
  const userInfo = document.getElementById("userInfo");
  try {
    const getInfo = await axios.get("/api/users/info");
    const user = getInfo.data.data;
    console.log(user.nickname);
    const insert = `<span class="user-balance">${user.balance} 포인트</span>`;
    userInfo.innerHTML = insert;
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

getInfo();
