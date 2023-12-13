async function getRestaurants() {
  try {
    const result = await axios.get("/api/suragan");
    const restaurantsList = result.data.data;
    console.log(restaurantsList[0]);
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
}
getRestaurants();
