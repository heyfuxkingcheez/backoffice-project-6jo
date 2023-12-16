//홈으로 이동동
document.getElementById("gohome").addEventListener("click", function () {
  window.location.href = "index.html";
});

//메뉴 목록 조회
async function loadMenus() {
  try {
    const result = await axios.get(`/api/suragan/${restaurantId}/charimpyo`);
    console.log("들어옴?", restaurantId);
    const restaurant = result.data.data;
    const restaurantId = restaurant.restaurantId;

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
                ${data.name}&nbsp;&nbsp;<span class="pset01">${data.price}</span
                ><span class="food-image-set"
                  ><img src="${data.image}" width="80"
                /></span>
              </a>
            </div>
          </div>
            `;
      document.querySelector(".item-main");
      console.log.insertAdjacentHTML("beforeend", menuList);
    });
  } catch (error) {
    console.error("그래 맞아, 놀랍게도 에러야", error);
  }
}
loadMenus;
