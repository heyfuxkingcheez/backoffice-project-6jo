import { Router } from "express";
import { ReviewController } from "../controllers/review.controller.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";

const reviewsRouter = Router();
const reviewController = new ReviewController();

// 리뷰 조회 API
reviewsRouter.get("/:restaurantId/order/review", reviewController.getReview);

// // 리뷰 등록 API
reviewsRouter.post(
  "/:restaurantId/order/review/:orderId",
  auth_middleware,
  reviewController.createReview
);

export { reviewsRouter };
