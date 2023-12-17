import { ReviewService } from "../services/review.service.js";

export class ReviewController {
  reviewService = new ReviewService();

  // 리뷰 조회
  getReview = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;

      const getReview = await this.reviewService.getReview(restaurantId);
      return res.status(200).json({
        success: true,
        message: "리뷰 조회 성공",
        data: getReview,
      });
    } catch (err) {
      next(err);
    }
  };

  getReviewOne = async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const getReviewOne = await this.reviewService.getReviewOne(orderId);
      return res.status(200).json({
        success: true,
        message: "리뷰 조회 성공",
        data: getReviewOne,
      });
    } catch (err) {
      next(err);
    }
  };

  // 리뷰 등록
  createReview = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { star, review } = req.body;
      const { restaurantId, orderId } = req.params;

      const createdReview = await this.reviewService.createReview(
        userId,
        star,
        review,
        restaurantId,
        orderId
      );

      return res.status(200).json({
        success: true,
        message: "리뷰 등록 성공!",
        data: createdReview,
      });
    } catch (err) {
      next(err);
    }
  };
}
