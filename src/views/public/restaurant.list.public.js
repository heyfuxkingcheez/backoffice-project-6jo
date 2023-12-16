// 홈으로 이동
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
  .find((cookie) => cookie.trim().startsWith("authorization")); // 로그인 상태 확인

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

// 서버로부터 데이터를 로드하는 함수
async function loadRestaurants(category) {
  try {
    const response = await axios.get(`/api/suragan?${category}`);
    const restaurants = response.data.data;
    console.log(restaurants);
    restaurants.forEach((data) => {
      let restaurantsList = `
        <div class="restaurant-box" data-id=${data.restaurantId}>
          <div class="restaurant-img"><img src="${data.image}"/></div>
          <div class="introduce">
            <h3>${data.name}</h3>
            <p><span>별점</span> | <span>리뷰</span></p>
            <p>${data.introduce}</p>
            <p>${data.businessHours}</p>
          </div>
        </div>
      `;

      document
        .querySelector("#restaurants-list")
        .insertAdjacentHTML("beforeend", restaurantsList);

      // 클릭시 해당하는 restaurantId 리턴
      const elements = document.getElementsByClassName("restaurant-box");
      for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function (event) {
          const restaurantId = event.currentTarget.getAttribute("data-id");
          console.log(restaurantId);
          // loadRestaurantDetail(Number(category));
        });
      }
    });
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}

const receivedCategoryData = location.href.split("=")[1];
loadRestaurants(receivedCategoryData);

// 다른 카테고리 클릭 시
const elements = document.getElementsByClassName("category");
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function (event) {
    const category = event.currentTarget.getAttribute("data-categories");
    document.querySelector(".main-box").innerHTML = "";
    loadRestaurants(category);
  });
}

// 서버로부터 데이터를 로드하는 함수
async function loadRestaurants(category) {
  try {
    const response = await axios.get(`/api/suragan?category=${category}`);
    const restaurants = response.data.data;
    restaurants.forEach((data) => {
      console.log(data);
      let restaurantsList = `
        <div class="restaurant-box" data-id=${data.restaurantId}>
          <div class="restaurant-img"><img src="${data.image}" /></div>
          <div class="introduce">
            <h3>${data.name}</h3>
            <p><span>별점</span> | <span>리뷰</span></p>
            <p>${data.introduce}</p>
            <p>${data.businessHours}</p>
          </div>
        </div>
      `;
      document
        .querySelector("#restaurants-list")
        .insertAdjacentHTML("beforeend", restaurantsList);
    });

    // 식당 클릭 시 식당 아이디 값 리턴
    const restaurantBox = document.getElementsByClassName("restaurant-box");
    for (let i = 0; i < elements.length; i++) {
      restaurantBox[i].addEventListener("click", function (event) {
        const restaurantId = event.currentTarget.getAttribute("data-id");

        loadDetailRestaurant(restaurantId);
      });
    }
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}
// 식당 상세 페이지 이동하는 함수
async function loadDetailRestaurant(restaurantId) {
  // 해당 카테고리 페이지로 이동하면서 데이터도 함께 전달

  window.location.href = `menu.html?${restaurantId}`;
}
