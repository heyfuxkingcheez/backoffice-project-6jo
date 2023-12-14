// 홈으로 이동
document.getElementById("gohome").addEventListener("click", function () {
  window.location.href = "index.html";
});

// 서버로부터 데이터를 로드하는 함수
async function loadRestaurants(category) {
  try {
    const response = await axios.get(`/api/suragan?${category}`);
    const restaurants = response.data.data;
    console.log(restaurants);
    restaurants.forEach((data) => {
      let restaurantsList = `
        <div class="restaurant-box" data-id=${data.restaurantId}>
          <div class="restaurant-img"><img src="./image/kingdragon.jpg" /></div>
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

const receivedCategoryData = location.href.split("?")[1];
loadRestaurants(receivedCategoryData);

// 여러 요소에 대한 클릭 이벤트 처리
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
      let restaurantsList = `
        <div class="restaurant-box">
          <div class="restaurant-img"><img src="./image/kingdragon.jpg" /></div>
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
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}
