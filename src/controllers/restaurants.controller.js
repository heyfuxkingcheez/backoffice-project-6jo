import { RestaurantsService } from "../services/restaurants.service.js";

export class RestaurantsController {
  restaurantsService = new RestaurantsService();
  // // 식당 목록 조회
  // findAllRestaurants = async (req, res, next) => {
  //   try {
  //     const category = req.query.category
  //     const restaurants = await this.restaurantsService.findAllRestaurants(category);

  //     return res.status(200).json({
  //       success: true,
  //       message: "식당 목록 조회 성공!",
  //       data: restaurants,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // };

    // 식당 목록 조회
  findAllRestaurants = async (req, res, next) => {
    try {
      const category = req.query.category
      const restaurants = await this.restaurantsService.findAllRestaurants(category);

      return res.status(200).json({
        success: true,
        message: "카테고리별 식당 목록 조회 성공!",
        data: restaurants,
      });
    } catch (err) {
      next(err);
    }
  };

  // 식당 등록
  createRestaurant = async (req, res, next) => {
    try {
      const userId = res.locals.user.userId;
      const {
        category,
        name,
        address,
        introduce,
        businessHours,
        phoneNumber,
      } = await req.body;
      console.log(req.body);
      const createdRestaurant = await this.restaurantsService.createRestaurant(
        userId,
        category,
        name,
        address,
        introduce,
        businessHours,
        phoneNumber
      );

      return res.status(200).json({
        success: true,
        message: "식당 등록 성공!",
        data: createdRestaurant,
      });
    } catch (err) {
      next(err);
    }
  };

  // 식당 상세 조회
  findRestaurantById = async (req, res, next) => {
    try {
      // 조회할 식당 아이디
      const { restaurantId } = req.params;
      const restaurant = await this.restaurantsService.findRestaurantById(
        restaurantId
      );
      res.status(200).json({
        Message: `${restaurantId}번 식당 조회 완료`,
        data: restaurant,
      });
    } catch (error) {
      next(error);
    }
  };

  // 식당 수정
  updateRestaurant = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const userId = res.locals.user.userId;
      const { category, name, address, introduce, businessHours, phoneNumber } =
        await req.body;
      const updatedRestaurant = await this.restaurantsService.updateRestaurant(
        restaurantId,
        userId,
        category,
        name,
        address,
        introduce,
        businessHours,
        phoneNumber
      );

      return res.status(200).json({
        success: true,
        message: "식당 정보 수정 성공!",
        data: updatedRestaurant,
      });
    } catch (err) {
      next(err);
    }
  };
  // 식당 삭제
  deleteRestaurant = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const userId = res.locals.user.userId;
      await this.restaurantsService.deleteRestaurant(restaurantId,userId);

      return res.status(200).json({
        success: true,
        message: "식당 삭제 성공!",
      });
    } catch (err) {
      next(err);
    }
  };
}
