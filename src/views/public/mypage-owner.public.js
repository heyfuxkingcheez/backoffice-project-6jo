// 업장 정보 조회
async function getOwnerInfo() {
  try {
    const result = await axios.get(`/api/suragan/owner`);
    const restaurant = result.data.data[0];

    document.getElementById("image").value = restaurant.image;
    document.getElementById("category").value = restaurant.category;
    document.getElementById("name").value = restaurant.name;
    document.getElementById("address").value = restaurant.address;
    document.getElementById("introduce").value = restaurant.introduce;
    document.getElementById("businessHours").value = restaurant.businessHours;
    document.getElementById("phoneNumber").value = restaurant.phoneNumber;

    document
      .getElementById("restaurant-update-btn")
      .addEventListener("click", async function () {
        const restaurantId = restaurant.restaurantId;
        const image = document.getElementById("image").value;
        const category = document.getElementById("category").value;
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const introduce = document.getElementById("introduce").value;
        const businessHours = document.getElementById("businessHours").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        const updateRestaurant = await axios.put(
          `/api/suragan/${restaurantId}`,
          {
            image,
            category: Number(category),
            name,
            address,
            introduce,
            businessHours,
            phoneNumber,
          }
        );
        console.log(updateRestaurant);
        alert("수라간 정보 업데이트 완료!");
      });

    document
      .getElementById("restaurant-delete-btn")
      .addEventListener("click", async function () {
        const restaurantId = restaurant.restaurantId;
        const deleteRestaurant = await axios.delete(
          `/api/suragan/${restaurantId}`
        );
        console.log(deleteRestaurant);
        alert("수라간 삭제 완료!");
      });
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
}

getOwnerInfo();
