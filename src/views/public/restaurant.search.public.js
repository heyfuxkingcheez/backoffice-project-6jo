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


let cachedRestaurants = null;

async function loadRestaurants() {
  try {
    if (!cachedRestaurants) {
      const response = await axios.get(`/api/suragan/all`);
      cachedRestaurants = response.data.data;
      //가져온 레스토랑의 정보를 저장
    }
    console.log(cachedRestaurants);
    const categoryId = location.href.split("=")[1];
    console.log(categoryId);
    if (Number(categoryId) !== 0 && categoryId !== undefined) {
      cachedRestaurants = cachedRestaurants.filter((shop) => shop.category == categoryId)
    }
    console.log(cachedRestaurants);
    const searchInput = document
      .querySelector(".search-input")
      .value.toLowerCase();
    // 검색 조건에 따라 필터링된 레스토랑만 사용
    const filteredRestaurants = searchInput
      ? cachedRestaurants.filter((data) =>
          data.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : cachedRestaurants;
    const restaurantsListContainer =
      document.querySelector("#restaurants-list");
    restaurantsListContainer.innerHTML = ""; // 초기화

    console.log(filteredRestaurants);
    filteredRestaurants.forEach((data) => {
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
      restaurantsListContainer.insertAdjacentHTML("beforeend", restaurantsList);
    });
    // 식당 클릭 시 식당 아이디 값 리턴
    const elements = document.getElementsByClassName("restaurant-box");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", function (event) {
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

document.getElementById("search-btn").addEventListener("click", function () {
  loadRestaurants(); // 검색 버튼을 누를 때마다 데이터를 로드하고 화면을 갱신
});

loadRestaurants();
