import { prisma } from "../utils/prisma/index.js";

export class OrderRepository {
  // 잔고 확인
  checkPoint = async (userId) => {
    const checkedPoint = await prisma.point.findMany({
      where: { UserId: userId },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    return checkedPoint;
  };
  // 주문 결제 Transaction 적용
  orderPayment = async (
    userId,
    MenuIds,
    restaurantId,
    orderDetails,
    totalPrice
  ) => {
    const createdOrders = [];
    for (const MenuId of MenuIds) {
      const result = MenuId;
      console.log("result", result);
      const [createdPoint, createdOrder] = await prisma.$transaction(
        async (tx) => {
          const checkedMenu = await tx.menu.findUnique({
            where: {
              menuId: result,
              RestaurantId: +restaurantId,
            },
          });
          if (!checkedMenu) throw new Error("불일치(메뉴,가게)");
          const checkedPoint = await tx.point.findMany({
            where: { UserId: userId },
            orderBy: { createdAt: "desc" },
            take: 1,
          });
          // console.log("checkedPoint: ", checkedPoint[0].balance);
          if (checkedPoint[0].balance <= 0) throw new Error("잔액 부족");

          const createdPoint = await tx.point.create({
            data: {
              UserId: userId,
              income: 0,
              expense: totalPrice,
              balance: checkedPoint[0].balance - totalPrice,
            },
          });

          const createdOrder = await tx.orders.create({
            data: {
              MenuId: result,
              UserId: userId,
              RestaurantId: +restaurantId,
              orderDetails,
              totalPrice,
            },
          });
          return [createdPoint, createdOrder];
        }
      );
      createdOrders.push({ createdOrder, createdPoint });
    }
    return createdOrders;
  };

  // 주문 목록 조회 API (사장)
  getOrders = async (restaurantId) => {
    const getOrders = await prisma.orders.findMany({
      where: { RestaurantId: +restaurantId },
      select: {
        orderId: true,
        orderDetails: true,
        totalPrice: true,
        isCompleted: true,
        createdAt: true,
      },
    });

    console.log("getOrders: ", getOrders);
    return getOrders;
  };

  // 배달 완료 API (사장)
  completeOrder = async (orderId) => {
    const [updateOrderStatus, createPointOfOnwer] = await prisma.$transaction(
      async (tx) => {
        const updateOrderStatus = await tx.orders.update({
          where: { orderId: +orderId },
          data: {
            isCompleted: true,
          },
        });
        const checkedPoint = await tx.point.findMany({
          where: { UserId: updateOrderStatus.UserId },
          orderBy: { createdAt: "desc" },
          take: 1,
        });
        console.log("checkedPoint: ", checkedPoint);

        console.log("updateOrderStatus: ", updateOrderStatus);
        const createPointOfOnwer = await tx.point.create({
          data: {
            UserId: updateOrderStatus.UserId,
            income: updateOrderStatus.totalPrice,
            expense: 0,
            balance: checkedPoint[0].balance + updateOrderStatus.totalPrice,
          },
        });
        return [updateOrderStatus, createPointOfOnwer];
      }
    );
    return [updateOrderStatus, createPointOfOnwer];
  };
}
