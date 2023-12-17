const restaurantId = location.href.split("?")[1];
console.log(restaurantId);

// 홈으로 이동
document.getElementById("gohome").addEventListener("click", function () {
  window.location.href = "index.html";
});

// 담기 클릭 시 장바구니에 담김
let menuId;
// 장바구니 메뉴 중복 제거를 위한 아이디값 배열
let cartMenuId = [];
// 수량
// let count = 0;
// 메뉴 이름
let orderDetail = [];
// 수량
let cartMenu = [];
// 총가격
let totalPrice = 0;

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
    document.querySelector(".item-title").innerHTML = restaurant.name;
    const imageElement = document.querySelector(".item-card-main img");
    const newImagePath = restaurant.image;
    imageElement.src = newImagePath;
    console.log(restaurant);
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
    if (!menus.length) {
      let menuList = `
      <div class="item-content">
      <div class="list-group">
        <a class="list-group-item list-group-item-action">
          &nbsp;&nbsp;<span class="pset01">아직 등록된 메뉴가 없습니다!</span><span class="food-image-set"><img src="./image/heart2.png"
              width="80" /></span>
        </a>
      </div>
    </div>
    `;
      document
        .querySelector(".item-main")
        .insertAdjacentHTML("beforeend", menuList);
    }
    menus.forEach((data) => {
      console.log("데이터", data);
      let menuList = `
        <div class="item-content">
          <div class="list-group">
            <a class="list-group-item list-group-item-action" data-toggle="modal" data-target="#modal${data.menuId}">
              ${data.name}&nbsp;&nbsp;<span class="pset01">${data.price}원</span>
              <span class="food-image-set"><img src="${data.image}" width="80" /></span>
            </a>
          </div>
        </div>
      `;
      document
        .querySelector(".item-main")
        .insertAdjacentHTML("beforeend", menuList);
      let menuListModal = `
      <div class="modal fade" id="modal${data.menuId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    상세정보
                  </h5>
                </div>
                <div class="modal-body">
                  <h5>${data.name}</h5>
                  <img src="${data.image}" width="440" />
                  <p class="pay-position">${data.introduce}</p>
                  <h5>가격</h5>
                  <div class="alert alert-info" role="alert">
                  ${data.price}원<span class="alert-second"></span>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    취소하기
                  </button>
                  <button type="button" class="cartBtn btn btn-success" data-id="${data.menuId}" data-dismiss="modal">
                    장바구니에 담기
                  </button>
                </div>
              </div>
            </div>
          </div>
      `;
      document
        .querySelector(".item-side")
        .insertAdjacentHTML("beforeend", menuListModal);
    });
    document.querySelectorAll(".cartBtn").forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        // document.querySelector(".list01").innerHTML = "";
        menuId = e.target.getAttribute("data-id");
        console.log(menuId);
        if (cartMenuId.includes(Number(menuId)))
          return alert("이미 담은 메뉴입니다.");

        // 상세메뉴 조회하여 카트에 담기
        let result = await axios.get(
          `/api/suragan/${restaurantId}/charimpyo/${menuId}`
        );
        let menuInfo = result.data.data;

        cartMenuId.push(menuInfo.menuId);
        cartMenu.push(menuInfo);
        let menuName = menuInfo.name;
        let menuPrice = menuInfo.price;
        orderDetail.push({ menuName, menuPrice, count: 1, menuId });
        // 담기 버튼 클릭 시 해당 메뉴의 price 를 totalPrice 에 합산
        totalPrice += Number(menuInfo.price);

        let cartList = `
          <div class="item-list-container">
            <p class="item-list-section item-list-section01">${menuInfo.name}</p>
            <div class="item-list-section item-list-section02">
              <i class="material-icons icon-set02" data-id="${menuInfo.menuId}">cancel</i>${menuInfo.price}원
              <div
                class="btn-group item-count"
                role="group"
                aria-label="Basic example"
              >
                <button class="bt bt01 up" data-id="${menuInfo.menuId}">-</button>
                <button class="bt bt-count">1</button>
                <button class="bt bt02 down" data-id="${menuInfo.menuId}">+</button>
              </div>
            </div>
          </div>
          `;
        document
          .querySelector(".list01")
          .insertAdjacentHTML("beforeend", cartList);
        document.querySelector("#totalPrice").innerHTML = totalPrice;

        document.querySelectorAll(".bt01.up").forEach((button) => {
          button.addEventListener("click", function () {
            const dataId = this.getAttribute("data-id");
            const itemQuantity = orderDetail.filter(
              (item) => item.menuId === dataId
            );
            if (itemQuantity[0].count === 1) {
              return alert("더 이상 감소시킬 수 없습니다.");
            }
            itemQuantity[0].count--;
            const countButton = this.parentElement.querySelector(".bt-count");
            countButton.innerText = itemQuantity[0].count;
            totalPrice -= Number(itemQuantity[0].menuPrice); // 특정 가격을 뺍니다.
            document.querySelector("#totalPrice").innerHTML = totalPrice;
            console.log(orderDetail);
          });
        });
        document.querySelectorAll(".bt02.down").forEach((button) => {
          button.addEventListener("click", function () {
            const dataId = this.getAttribute("data-id");
            const itemQuantity = orderDetail.filter(
              (item) => item.menuId === dataId
            );
            itemQuantity[0].count++;
            const countButton = this.parentElement.querySelector(".bt-count");
            countButton.innerText = itemQuantity[0].count;
            totalPrice += Number(itemQuantity[0].menuPrice); // 특정 가격을 더합니다.
            document.querySelector("#totalPrice").innerHTML = totalPrice;
            console.log(orderDetail);
          });
        });

        document.querySelectorAll(".material-icons").forEach((button) => {
          button.addEventListener("click", function () {
            const dataId = this.getAttribute("data-id");
            const itemQuantity = orderDetail.filter(
              (item) => item.menuId === dataId
            );
            const countButton = this.closest('.item-list-section02').querySelector('.bt-count').innerText;
            console.log(countButton);
            totalPrice -= Number(itemQuantity[0].menuPrice * countButton); // 특정 가격을 더합니다.
            document.querySelector("#totalPrice").innerHTML = totalPrice;
            cartMenuId = cartMenuId.filter((item) => item !== Number(dataId));
            orderDetail = orderDetail.filter((item) => item.menuId !== dataId);
            const cartListItem = this.closest(".item-list-container");
            cartListItem.remove();
            console.log(cartMenuId);
            console.log(orderDetail);
          });
        });

        console.log(cartMenuId);
        console.log(orderDetail);
        console.log(totalPrice);
      });
    });
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}

// 탭메뉴 구현
// 메뉴정보, 업장 정보, 리뷰 구현
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
