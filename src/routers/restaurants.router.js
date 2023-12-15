import { Router } from "express";
import { RestaurantsController } from "../controllers/restaurants.controller.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";
import { auth_owner_middleware } from "../middlewares/auth.owner.middleware.js";

const restaurantsRouter = Router();
const restaurantsController = new RestaurantsController();

// 식당 등록 API
restaurantsRouter.post(
  "/",
  auth_middleware,
  restaurantsController.createRestaurant
);

// 식당 목록  카테고리별 조회 API
restaurantsRouter.get("/", restaurantsController.findCategoryRestaurants);

// 식당 전체 목록 조회 API
restaurantsRouter.get("/all", restaurantsController.findAllRestaurants);

// 오너 - 식당 조회 API
restaurantsRouter.get(
  "/owner",
  auth_middleware,
  restaurantsController.findRestaurantByUserId
);

// // 손님 - 식당 조회 API
// restaurantsRouter.get(
//   "/detail",
//   restaurantsController.findRestaurantById
// );

// 식당 상세 조회 API
restaurantsRouter.get(
  "/:restaurantId",
  restaurantsController.findRestaurantById
);

// 식당 수정 API
restaurantsRouter.put(
  "/:restaurantId",
  auth_middleware,
  auth_owner_middleware,
  restaurantsController.updateRestaurant
);

// 식당 삭제 API
restaurantsRouter.delete(
  "/:restaurantId",
  auth_middleware,
  auth_owner_middleware,
  restaurantsController.deleteRestaurant
);

export { restaurantsRouter };
