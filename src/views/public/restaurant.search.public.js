// 홈으로 이동
document.getElementById("gohome").addEventListener("click", function () {
  window.location.href = "index.html";
});

let cachedRestaurants = null;

async function loadRestaurants() {
  try {
    if (!cachedRestaurants) {
      const response = await axios.get(`/api/suragan/all`);
      cachedRestaurants = response.data.data;
      //가져온 레스토랑의 정보를 저장
    }

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

    console.log(cachedRestaurants);
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
    // 클릭시 해당하는 restaurantId 리턴
    const elements = document.getElementsByClassName("restaurant-box");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", function (event) {
        const restaurantId = event.currentTarget.getAttribute("data-id");
        console.log(restaurantId);
      });
    }
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}

document.getElementById("search-btn").addEventListener("click", function () {
  loadRestaurants(); // 검색 버튼을 누를 때마다 데이터를 로드하고 화면을 갱신
});

loadRestaurants();
