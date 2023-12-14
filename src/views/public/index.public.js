// 회원가입 이동
document.getElementById("join").addEventListener("click", function () {
  window.location.href = "user-page.html";
});

// 로그인 이동
document.getElementById("login").addEventListener("click", function () {
  window.location.href = "login.html";
});

// 사장님 등록 이동
document.getElementById("join-owner").addEventListener("click", function () {
  window.location.href = "restaurant-enroll.html";
});

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
