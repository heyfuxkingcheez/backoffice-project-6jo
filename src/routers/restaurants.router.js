import { Router } from "express";
import { RestaurantsController } from "../controllers/restaurants.controller.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";

const restaurantsRouter = Router();
const restaurantsController = new RestaurantsController();

// 식당 등록 API
restaurantsRouter.post("/", restaurantsController.createRestaurant);
// 식당 목록 조회 API
restaurantsRouter.get("/", restaurantsController.findAllRestaurants);
// 식당 상세 조회 API
restaurantsRouter.get(
  "/:restaurantId",
  restaurantsController.findRestaurantById
);

// // 식당 수정 API
// router.put("/:restaurantId", restaurantsController);
// // 식당 삭제 API
// router.delete("/:restaurantId", restaurantsController);

export { restaurantsRouter };
