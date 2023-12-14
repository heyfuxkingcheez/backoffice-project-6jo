import { OrderRepository } from "../repositories/order.repository.js";

export class OrderService {
  orderRepository = new OrderRepository();

  // 잔고 확인
  checkPoint = async (userId) => {
    const point = await this.orderRepository.checkPoint(userId);
    return {
      userId: point.userId,
      balance: point.balance,
    };
  };

  // 주문 생성
  createOrder = async (userId, MenuId, orderDetails, totalPrice) => {
    const point = await this.orderRepository.checkPoint(userId);

    if (point.balance < totalPrice) throw new Error("잔액이 부족합니다.");

    const createdOrder = await this.orderRepository.createOrder(
      userId,
      MenuId,
      orderDetails,
      totalPrice
    );
    const updatedPoint = await this.orderRepository.updatePoint(userId);

    return {
      userId: createdOrder.userId,
      MenuId: createdOrder.MenuId,
      orderDetails: createdOrder.orderDetails,
      totalPrice: createdOrder.totalPrice,
      balance: updatedPoint.balance,
    };
  };
}
