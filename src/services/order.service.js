import { OrderRepository } from "../repositories/order.repository.js";

export class OrderService {
  orderRepository = new OrderRepository();

  // 잔고 확인
  checkPoint = async (userId) => {
    const point = await this.orderRepository.checkPoint(userId);
    return {
      userId: point.UserId,
      balance: point.balance,
    };
  };

  // 주문 생성
  // createOrder = async (userId, MenuId, orderDetails, totalPrice) => {
  //   const point = await this.orderRepository.checkPoint(userId);

  //   if (!point || point.balance < totalPrice)
  //     throw new Error("잔액이 부족합니다.");

  //   const createdOrder = await this.orderRepository.createOrder(
  //     userId,
  //     MenuId,
  //     orderDetails,
  //     totalPrice
  //   );
  //   const createdPoint = await this.orderRepository.createPoint(
  //     userId,
  //     totalPrice,
  //     point.pointId
  //   );

  //   return {
  //     userId: createdOrder.userId,
  //     MenuId: createdOrder.MenuId,
  //     orderDetails: createdOrder.orderDetails,
  //     totalPrice: createdOrder.totalPrice,
  //     balance: createdPoint.balance,
  //   };
  // };

  // 주문 결제
  orderPayment = async (userId, MenuId, orderDetails, totalPrice) => {
    // const checkedPoint = await this.orderRepository.checkPoint(userId);
    // console.log(checkedPoint);
    // if (checkedPoint[0].balance <= 0) throw new Error("잔액 부족");

    const orderPayment = await this.orderRepository.orderPayment(
      userId,
      MenuId,
      orderDetails,
      totalPrice
    );
    // console.log("orderPayment: ", orderPayment);

    return orderPayment;
  };
}
