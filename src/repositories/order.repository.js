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
    totalPrice,
    orderPlace
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

          console.log(orderPlace);
          const createdOrder = await tx.orders.create({
            data: {
              MenuId: result,
              UserId: userId,
              RestaurantId: +restaurantId,
              orderDetails,
              totalPrice,
              orderPlace,
            },
          });
          return [createdPoint, createdOrder];
        }
      );
      createdOrders.push({ createdOrder, createdPoint });
    }
    return createdOrders;
  };

  // 주문 조회 조회 API (고객)
  getOrdersUser = async (restaurantId, userId) => {
    const getOrdersUser = await prisma.orders.findMany({
      where: { RestaurantId: +restaurantId, isCompleted: true, UserId: userId },
      select: {
        orderId: true,
        UserId: true,
        orderDetails: true,
        totalPrice: true,
        orderPlace: true,
        isCompleted: true,
        createdAt: true,
      },
    });

    return getOrdersUser;
  };

  // 주문 목록 조회 API (사장)
  getOrders = async (restaurantId) => {
    const getOrders = await prisma.orders.findMany({
      where: { RestaurantId: +restaurantId, isCompleted: false },
      select: {
        orderId: true,
        orderDetails: true,
        totalPrice: true,
        orderPlace: true,
        isCompleted: true,
        createdAt: true,
      },
    });

    return getOrders;
  };

  // 배달 완료 API (사장)
  completeOrder = async (orderId, UserId) => {
    const [updateOrderStatus, createPointOfOnwer] = await prisma.$transaction(
      async (tx) => {
        // 사장님 지갑
        const restaurantOwner = await tx.users.findUnique({
          where: { userId: UserId },
        });

        const checkedPoint = await tx.point.findMany({
          where: { UserId: restaurantOwner.userId },
          orderBy: { createdAt: "desc" },
          take: 1,
        });

        const updateOrderStatus = await tx.orders.update({
          where: { orderId: +orderId },
          data: {
            isCompleted: true,
          },
        });

        const createPointOfOnwer = await tx.point.create({
          data: {
            UserId: restaurantOwner.userId,
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
