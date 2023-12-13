import { RestaurantsRepository } from "../repositories/restaurants.repository.js";

export class RestaurantsService {
  restaurantsRepository = new RestaurantsRepository();

  // 식당 목록 조회
  findAllRestaurants = async () => {
    const restaurants = await this.restaurantsRepository.findAllRestaurants();
    if (restaurants.length === 0) throw new Error("조회되는 식당이 없어요");

    return restaurants.map((restaurant) => {
      return {
        restaurantId: restaurant.restaurantId,
        userId: restaurant.UserId,
        category: restaurant.category,
        name: restaurant.name,
        address: restaurant.address,
        introduce: restaurant.introduce,
        businessHours: restaurant.businessHours,
        phoneNumber: restaurant.phoneNumber,
        // createdAt: restaurant.createdAt,
        // updatedAt: restaurant.updatedAt,
      };
    });
  };

  // 식당 등록
  createRestaurant = async (
    userId,
    category,
    name,
    address,
    introduce,
    businessHours,
    phoneNumber
  ) => {
    const createdRestaurant =
      await this.restaurantsRepository.createdRestaurant(
        userId,
        category,
        name,
        address,
        introduce,
        businessHours,
        phoneNumber
      );

    return {
      userId: createdRestaurant.UserId,
      category: createdRestaurant.category,
      name: createdRestaurant.name,
      address: createdRestaurant.address,
      introduce: createdRestaurant.introduce,
      businessHours: createdRestaurant.businessHours,
      phoneNumber: createdRestaurant.phoneNumber,
    };
  };

  // 식당 상세 조회
  findRestaurantById = async (restaurantId) => {
    const restaurant = await this.restaurantsRepository.findRestaurantById(
      restaurantId
    );

    return restaurant;
  };
}
