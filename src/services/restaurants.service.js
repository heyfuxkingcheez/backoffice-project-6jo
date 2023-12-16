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
        image: restaurant.image,
        category: restaurant.category,
        name: restaurant.name,
        address: restaurant.address,
        introduce: restaurant.introduce,
        businessHours: restaurant.businessHours,
        phoneNumber: restaurant.phoneNumber,
      };
    });
  };

  // 카테고리별 식당 목록 조회
  findCategoryRestaurants = async (category) => {
    const restaurants =
      await this.restaurantsRepository.findCategoryRestaurants(category);
    if (restaurants.length === 0) throw new Error("조회되는 식당이 없어요");

    return restaurants.map((restaurant) => {
      return {
        restaurantId: restaurant.restaurantId,
        userId: restaurant.UserId,
        image: restaurant.image,
        category: restaurant.category,
        name: restaurant.name,
        address: restaurant.address,
        introduce: restaurant.introduce,
        businessHours: restaurant.businessHours,
        phoneNumber: restaurant.phoneNumber,
      };
    });
  };

  // 오너 - 식당 상세 조회

  findRestaurantByUserId = async (userId) => {
    const restaurants = await this.restaurantsRepository.findRestaurantByUserId(
      userId
    );
    if (restaurants.length === 0) throw new Error("조회되는 식당이 없어요");

    return restaurants.map((restaurant) => {
      return {
        restaurantId: restaurant.restaurantId,
        userId: restaurant.UserId,
        image: restaurant.image,
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
    image,
    category,
    name,
    address,
    introduce,
    businessHours,
    phoneNumber
  ) => {
    const createdRestaurant = await this.restaurantsRepository.createRestaurant(
      userId,
      image,
      category,
      name,
      address,
      introduce,
      businessHours,
      phoneNumber
    );

    return {
      userId: createdRestaurant.UserId,
      image: createdRestaurant.image,
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

  // 식당 수정
  updateRestaurant = async (
    restaurantId,
    userId,
    image,
    category,
    name,
    address,
    introduce,
    businessHours,
    phoneNumber
  ) => {
    const restaurant = await this.restaurantsRepository.findRestaurantById(
      restaurantId
    );
    if (!restaurant) throw new Error("존재하는 수라간이 아니옵니다!");
    if (userId !== restaurant.UserId)
      throw new Error("수라간 주인장만 수정 가능하시옵니다!");
    if (restaurantId) {
      await this.restaurantsRepository.updateRestaurant(
        restaurantId,
        image,
        category,
        name,
        address,
        introduce,
        businessHours,
        phoneNumber
      );
      const updatedRestaurant =
        await this.restaurantsRepository.findRestaurantById(restaurantId);
      return {
        restaurantId: updatedRestaurant.restaurantId,
        userId: updatedRestaurant.userId,
        image: updatedRestaurant.image,
        category: updatedRestaurant.category,
        name: updatedRestaurant.name,
        address: updatedRestaurant.address,
        introduce: updatedRestaurant.introduce,
        businessHours: updatedRestaurant.businessHours,
        phoneNumber: updatedRestaurant.phoneNumber,
        createdAt: updatedRestaurant.createdAt,
        updatedAt: updatedRestaurant.updatedAt,
      };
    }
  };

  // 식당 삭제
  deleteRestaurant = async (restaurantId, userId) => {
    const restaurant = await this.restaurantsRepository.findRestaurantById(
      restaurantId,
      userId
    );
    if (!restaurant) throw new Error("존재하는 수라간이 아니옵니다!");
    if (userId !== restaurant.UserId)
      throw new Error("수라간 주인장만 삭제 가능하시옵니다!");

    await this.restaurantsRepository.deleteRestaurant(restaurantId);
  };
}
