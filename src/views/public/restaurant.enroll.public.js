document.getElementById("submit").addEventListener("click", async function () {
  try {
    // const userId ; // 쿠키에서 받은 사용자 정보
    const category = document.getElementById("category").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const introduce = document.getElementById("introduce").value;
    const businessHours = document.getElementById("businessHours").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    createRestaurant = await axios.post("/api/suragan", {
      userId: 1,
      category: Number(category),
      name,
      address,
      introduce,
      businessHours,
      phoneNumber,
    });

    console.log(createRestaurant);
    alert("등록 완료!");
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
});

async function getRestaurants() {
  try {
    const result = await axios.get("/api/suragan");
    const restaurantsList = result.data.data;
    console.log(restaurantsList[0]);
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
}
