const receivedRestaurantId = location.href.split("?")[1];

// 식당 정보 데이터를 로드하는 함수
loadRestaurantInfo(receivedRestaurantId);
async function loadRestaurantInfo(restaurantId) {
  try {
    const response = await axios.get(`/api/suragan/${receivedRestaurantId}`);
    const restaurant = response.data.data;
    console.log(restaurant);
  } catch (error) {
    console.error("Error fetching posts", error);
  }
}
