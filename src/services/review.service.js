import { ReviewRepository } from "../repositories/review.repository.js";

export class ReviewService {
  reviewRepository = new ReviewRepository();

  // 리뷰 조회
  getReview = async (restaurantId) => {
    const getReview = await this.reviewRepository.getReview(restaurantId);
    const result = [];
    for (const existReview of getReview) {
      if (existReview.Reviews !== null) {
        result.push(existReview);
      }
    }
    console.log("리뷰있는애들", result);

    return result;
  };

  // 리뷰 등록
  createReview = async (userId, star, review, restaurantId, orderId) => {
    const createdReview = await this.reviewRepository.createReview(
      userId,
      star,
      review,
      restaurantId,
      orderId
    );
    if (createdReview.userOrder.length === 0)
      throw new Error("주문 내역이 없습니다.");
    if (createdReview.isComplete.UserId !== +userId)
      throw new Error("잘못된 접근입니다.");
    if (createdReview.isComplete.isCompleted !== true)
      throw new Error("배달 미완료 주문입니다.");

    return {
      createdReview,
    };
  };
}
