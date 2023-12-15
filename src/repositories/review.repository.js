import { prisma } from "../utils/prisma/index.js";

export class ReviewRepository {
  // 리뷰 조회
  getReview = async (restaurantId) => {
    const getReview = await prisma.orders.findMany({
      where: {
        RestaurantId: +restaurantId,
      },
      include: {
        Reviews: {
          select: {
            OrderId: true,
            star: true,
            review: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    console.log("getReview: ", getReview);
    return getReview;
  };

  // 리뷰 등록
  createReview = async (userId, star, review, restaurantId, orderId) => {
    const userOrder = await prisma.orders.findMany({
      where: { UserId: +userId },
    });

    const isComplete = await prisma.orders.findUnique({
      where: { orderId: +orderId },
    });

    const createReview = await prisma.reviews.create({
      data: {
        OrderId: +orderId,
        star: star,
        review: review,
      },
    });

    return { createReview, userOrder, isComplete };
  };
}
