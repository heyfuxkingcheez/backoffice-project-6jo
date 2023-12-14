import { prisma } from "../utils/prisma/index.js";

export class OrderRepository {
  // 잔고 확인
  checkPoint = async (userId) => {
    const checkedPoint = await prisma.point.findUnique({
      where: { userId },
    });
    return checkedPoint;
  };

  // 주문 생성
  createOrder = async (userId, MenuId, orderDetails, totalPrice) => {
    const createdOrder = await prisma.orders.create({
      UserId: userId,
      MenuId,
      orderDetails,
      totalPrice,
    });
    return createdOrder;
  };
}
