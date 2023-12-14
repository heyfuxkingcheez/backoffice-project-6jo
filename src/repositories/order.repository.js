import { prisma } from "../utils/prisma/index.js";

export class OrderRepository {
  // 잔고 확인
  checkPoint = async (userId) => {
    const checkedPoint = await prisma.point.findFirst({
      where: { UserId: userId },
    });
    return checkedPoint;
  };

  // 잔고 수정
  createPoint = async (userId, totalPrice) => {
    const checkedPoint = await prisma.point.findMany({
      where: { UserId: userId },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    console.log("checkedPoint: ", checkedPoint[0].balance);
    const createdPoint = await prisma.point.create({
      data: {
        UserId: userId,
        income: 0,
        expense: totalPrice,
        balance: checkedPoint[0].balance - totalPrice,
      },
    });
    return createdPoint;
  };

  // 주문 생성
  createOrder = async (userId, MenuId, orderDetails, totalPrice) => {
    console.log("MenuId: ", MenuId);
    console.log("userId: ", userId);
    const createdOrder = await prisma.orders.createMany({
      data: { MenuId, UserId: userId, orderDetails, totalPrice },
    });
    return createdOrder;
  };
}
