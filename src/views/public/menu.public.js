//홈으로 이동동
document.getElementById("gohome").addEventListener("click", function () {
  window.location.href = "index.html";
});
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

const roleCookie = document.cookie
  .split(";")
  .find((cookie) => cookie.trim().endsWith("true"));
const tokenCookie = document.cookie
  .split(";")
  .find((cookie) => cookie.trim().startsWith("authorization"));

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
/// 주소에서 id값 가져오는 함수
async function getUrl() {
  const queryParams = new URLSearchParams(window.location.search);
  const restaurantId = queryParams.get("restaurantId");
  console.log(restaurantId);

  return restaurantId;
}

// 메뉴 목록 조회
async function loadMenus() {
  try {
    const restaurantId = await getUrl();
    console.log("들어옴?", restaurantId);

    const result = await axios.get(`/api/suragan/${restaurantId}/charimpyo`);
    const restaurant = result.data.data;
    const response = await axios.get(
      `/api/suragan/${restaurantId}/charimpyo/${manuId}`
    );
    const menus = response.data.data;

    console.log("메뉴상세정보나옴?", menus);

    menus.forEach((data) => {
      console.log("데이터", data);
      let menuList = `
        <div class="item-content">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">
              ${data.name}&nbsp;&nbsp;<span class="pset01">${data.price}</span>
              <span class="food-image-set"><img src="${data.image}" width="80" /></span>
            </a>
          </div>
        </div>
      `;
      document
        .querySelector(".item-main")
        .insertAdjacentHTML("beforeend", menuList);
    });
  } catch (error) {
    console.error("에러 발생", error);
  }
}

loadMenus();
