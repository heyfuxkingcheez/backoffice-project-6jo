const restaurantId = location.href.split("?")[1];
console.log(restaurantId);

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

// let roleCookie = document.cookie
//   .split(";")
//   .find((cookie) => cookie.trim().endsWith("true"));
// let tokenCookie = document.cookie
//   .split(";")
//   .find((cookie) => cookie.trim().startsWith("authorization"));

// 로그인 상태 확인
if (
  document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("authorization"))
) {
  // 사업자 상태 확인
  if (
    document.cookie.split(";").find((cookie) => cookie.trim().endsWith("true"))
  ) {
    document.getElementById("logout").style.display = "block";
    document.getElementById("owner-page").style.display = "block";
    document.getElementById("cart").style.display = "block";
    document.getElementById("my-page").style.display = "block";
    document.getElementById("login").style.display = "none";
  } else if (
    !document.cookie.split(";").find((cookie) => cookie.trim().endsWith("true"))
  ) {
    document.getElementById("logout").style.display = "block";
    document.getElementById("join-owner").style.display = "block";
    document.getElementById("cart").style.display = "block";
    document.getElementById("my-page").style.display = "block";
    document.getElementById("login").style.display = "none";
  } else {
  }
}

// 식당 정보 데이터를 로드하는 함수
loadRestaurantInfo(restaurantId);
// 식당 메뉴 로드하는 함수
loadMenu(restaurantId);

async function loadRestaurantInfo(restaurantId) {
  try {
    const response = await axios.get(`/api/suragan/${restaurantId}`);
    const restaurant = response.data.data;
    console.log(restaurant);
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}

async function loadMenu(restaurantId) {
  try {
    const response = await axios.get(`/api/suragan/${restaurantId}/charimpyo`);
    const menus = response.data.data;
    console.log(menus);
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}

// 담기 클릭 시 장바구니에 담김
let menuId;
// 장바구니 메뉴 중복 제거를 위한 아이디값 배열
let cartMenuId = [];
// 수량
let count = 0;
// 메뉴 이름
let orderDetail = [];
// 수량
let cartMenu = [];
// 총가격
let totalPrice = 0;

document.querySelectorAll(".cartBtn").forEach((btn) => {
  btn.addEventListener("click", async function (e) {
    document.querySelector(".list01").innerHTML = "";
    menuId = e.target.getAttribute("data-id");
    if (cartMenuId.includes(Number(menuId)))
      return alert("이미 담은 메뉴입니다.");

    // 상세메뉴 조회하여 카트에 담기
    let result = await axios.get(
      `/api/suragan/${restaurantId.split[0]}/charimpyo/${menuId}`
    );
    let menuInfo = result.data.data;

    cartMenuId.push(menuInfo.menuId);
    cartMenu.push(menuInfo);
    let menuName = menuInfo.name;
    orderDetail.push({ menuName, count });
    // 담기 버튼 클릭 시 해당 메뉴의 price 를 totalPrice 에 합산
    totalPrice += Number(menuInfo.price);

    cartMenu.forEach((menu) => {
      let cartList = `
      <p class="item-list-section item-list-section01">${menu.name}</p>
      <div class="item-list-section item-list-section02">
        <i class="material-icons icon-set02">cancel</i>${menu.price}원
        <div
          class="btn-group item-count"
          role="group"
          aria-label="Basic example"
        >
          <button class="bt bt01 up">-</button>
          <button class="bt bt-count">1</button>
          <button class="bt bt02 down">+</button>
        </div>
      </div>
      `;
      document
        .querySelector(".list01")
        .insertAdjacentHTML("beforeend", cartList);
      document.querySelector("#totalPrice").innerHTML = totalPrice;
    });
    console.log(cartMenuId);
    console.log(orderDetail);
    console.log(totalPrice);
  });
});
