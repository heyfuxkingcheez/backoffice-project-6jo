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

// 로그인 상태일 때 버튼 숨김
const cookie = document.cookie.split(";");

console.log(cookie);

// 로그인 상태 확인
if (cookie[1]) {
  // 사업자 상태 확인
  if (cookie[0] === "role=true") {
    document.getElementById("logout").style.display = "block";
    document.getElementById("owner-page").style.display = "block";
    document.getElementById("cart").style.display = "block";
    document.getElementById("my-page").style.display = "block";
    document.getElementById("login").style.display = "none";
  } else {
    document.getElementById("logout").style.display = "block";
    document.getElementById("join-owner").style.display = "block";
    document.getElementById("cart").style.display = "block";
    document.getElementById("my-page").style.display = "block";
    document.getElementById("login").style.display = "none";
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
