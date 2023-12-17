// 홈으로 이동
document.getElementById("gohome").addEventListener("click", function () {
  window.location.href = "index.html";
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
    document.getElementById("cart").style.display = "block";
    document.getElementById("my-page").style.display = "block";
  } else if (!roleCookie) {
    document.getElementById("logout").style.display = "block";
    document.getElementById("cart").style.display = "block";
    document.getElementById("my-page").style.display = "block";
  } else {
  }
}

// 메뉴 카테고리
let menuCategory = {
  1: "메인메뉴",
  2: "사이드메뉴",
  3: "음료",
  4: "기타",
};
// 메뉴 정보 조회
async function loadMenus() {
  try {
    const result = await axios.get(`/api/suragan/owner`);
    const restaurant = result.data.data[0];
    const restaurantId = restaurant.restaurantId;

    const response = await axios.get(`/api/suragan/${restaurantId}/charimpyo`);
    const menus = response.data.data;
    console.log(menus);
    menus.forEach((data) => {
      let menuList = `
        <div class="menu-info" data-menuId="${data.menuId}">
         <select class="menu-category" name="menu-category">
         <option selected disabled value=${data.category}>${
        menuCategory[data.category]
      }</option>
           <option value="1">메인메뉴</option>
           <option value="2">사이드메뉴</option>
           <option value="3">음료</option>
           <option value="4">기타</option>
         </select>
         <input type="text" class="menu-image" value="${data.image}" />
         <input type="text" class="menu-name" value="${data.name}" />
         <input type="text" class="menu-introduce" value="${data.introduce}" />
         <input type="text" class="menu-price" value="${data.price}" />
         <div class="btns">
           <button class="menu-update-btn">수정</button>
           <button class="menu-delete-btn">삭제</button>
         </div>
       </div> 
          `;
      document
        .querySelector(".middle-left-2")
        .insertAdjacentHTML("beforeend", menuList);
    });

    // 메뉴 수정
    const elements = document.querySelectorAll(".menu-update-btn");
    let menuId;
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", async function (event) {
        const menuInfo = event.target.parentElement.parentElement;
        menuId = menuInfo.getAttribute("data-menuId");
        // menuId = event.target.parentElement.getAttribute("data.menuId");
        const image = menuInfo.querySelector(".menu-image").value;
        const category = menuInfo.querySelector(".menu-category").value;
        const name = menuInfo.querySelector(".menu-name").value;
        const introduce = menuInfo.querySelector(".menu-introduce").value;
        const price = menuInfo.querySelector(".menu-price").value;

        console.log(category);
        // 메뉴 정보 수정
        const updateMenu = await axios.patch(
          `/api/suragan/${restaurantId}/charimpyo/${menuId}`,
          {
            category: Number(category),
            name,
            introduce,
            price: Number(price),
            image,
          }
        );
        console.log(updateMenu.category);
        // alert("메뉴 정보 업데이트 완료!");
      });
    }

    // 메뉴 삭제
    const delBtn = document.getElementsByClassName("menu-delete-btn");
    for (let i = 0; i < delBtn.length; i++) {
      delBtn[i].addEventListener("click", async function (event) {
        // 메뉴 아이디 조회
        const menuId =
          event.target.parentElement.parentElement.getAttribute("data-menuId");
        // 메뉴 정보 삭제
        const deleteMenu = await axios.delete(
          `/api/suragan/${restaurantId}/charimpyo/${menuId}`
        );
        console.log(deleteMenu);
        alert("수라간 정보 삭제 완료!");
      });
    }
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}

async function getOwnerInfo() {
  try {
    const result = await axios.get(`/api/suragan/owner`);
    const restaurant = result.data.data[0];

    document.getElementById("image-view").setAttribute("src", restaurant.image);
    document.getElementById("image").value = restaurant.image;
    // document.getElementById("category").value = restaurant.category;
    document.getElementById("name").value = restaurant.name;
    document.getElementById("address").value = restaurant.address;
    document.getElementById("introduce").value = restaurant.introduce;
    document.getElementById("businessHours").value = restaurant.businessHours;
    document.getElementById("phoneNumber").value = restaurant.phoneNumber;

    // 업장 정보 수정
    document
      .getElementById("restaurant-update-btn")
      .addEventListener("click", async function (event) {
        const restaurantId = restaurant.restaurantId;

        const image = document.getElementById("image").value;
        // const category = document.getElementById("category").value;
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const introduce = document.getElementById("introduce").value;
        const businessHours = document.getElementById("businessHours").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        // 업장 정보 업데이트 요청
        const updateRestaurant = await axios.patch(
          `/api/suragan/${restaurantId}`,
          {
            image,
            // category: Number(category),
            name,
            address,
            introduce,
            businessHours,
            phoneNumber,
          }
        );
        console.log(updateRestaurant);
        alert("수라간 정보 업데이트 완료!");
        window.location.reload();
      });

    // 업장 정보 삭제
    document
      .getElementById("restaurant-delete-btn")
      .addEventListener("click", async function () {
        try {
          const restaurantId = restaurant.restaurantId;
          await axios.delete(`/api/suragan/${restaurantId}`);
          if (confirm("정말 삭제 하시겠습니까?")) {
            alert("삭제 완료!");
            window.location.href = "index.html";
          } else {
            alert("취소합니다.");
          }
        } catch (error) {
          console.error("Error fetching post:", error.message);
        }
      });

    // 메뉴 등록
    document
      .getElementById("create-btn")
      .addEventListener("click", async function () {
        try {
          const restaurantId = restaurant.restaurantId;

          const image = document.getElementById("create-img").value;
          const name = document.getElementById("create-name").value;
          const price = document.getElementById("create-price").value;
          const category = document.getElementById("create-category").value;
          const introduce = document.getElementById("create-introduce").value;

          createRestaurant = await axios.post(
            `/api/suragan/${restaurantId}/charimpyo`,
            {
              category: Number(category),
              name,
              introduce,
              price: Number(price),
              image,
            }
          );

          alert("등록 완료!");
          window.location.reload();
          // window.location.href = "index.html";
        } catch (error) {
          console.error("Error fetching post:", error.message);
        }
      });
    loadMenus();

    // 주문 배달 확인
    const restaurantId = restaurant.restaurantId;
    async function getOrders(restaurantId) {
      try {
        const orderResult = await axios.get(
          `/api/suragan/${restaurantId}/order`
        );
        const orderData = orderResult.data.data;

        orderData.forEach((order) => {
          let orderList = `
          <tr class="delivery-table-td" data-orderId="${order.orderId}"> 
          <td>${order.orderId}</td>
          <td>${JSON.stringify(order.orderDetails).replace(/["{}]/g, "")}</td>
          <td>${order.totalPrice}</td>
          <td><button class="delivery-complete">배달완료</button></td>
        </tr>
            `;
          document
            .querySelector("#delivery-body")
            .insertAdjacentHTML?.("beforeend", orderList);
        });

        // 배달 완료 버튼 클릭 시 실행
        const deliveryComplete =
          document.querySelectorAll?.(".delivery-complete");

        for (let i = 0; i < deliveryComplete.length; i++) {
          deliveryComplete[i].addEventListener("click", async function (event) {
            const orderInfo = event.target.parentElement.parentElement;
            let orderId = orderInfo.getAttribute("data-orderId");

            // 배달 완료로 변경
            const deliveryCompleted = await axios.patch(
              `/api/suragan/${restaurantId}/order/${orderId}`
            );
            console.log(deliveryCompleted);
            alert("배달 정보 업데이트 완료!");
            location.reload();
          });
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    }
    getOrders(restaurantId);
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
}

getOwnerInfo();
