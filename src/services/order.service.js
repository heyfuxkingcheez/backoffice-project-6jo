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

  // 주문 결제
  orderPayment = async (
    userId,
    MenuId,
    restaurantId,
    orderDetails,
    totalPrice,
    orderPlace
  ) => {
    const orderPayment = await this.orderRepository.orderPayment(
      userId,
      MenuId,
      restaurantId,
      orderDetails,
      totalPrice,
      orderPlace
    );

    return orderPayment;
  };

  // 주문 조회 API (고객)
  getOrdersUser = async (restaurantId) => {
    const getOrdersUser = await this.orderRepository.getOrdersUser(
      restaurantId
    );

    return getOrdersUser;
  };

  // 주문 조회 API (사장)
  getOrders = async (restaurantId) => {
    const getOrders = await this.orderRepository.getOrders(restaurantId);

    return getOrders;
  };

  // 배달 완료 API (사장)
  completeOrder = async (orderId, UserId) => {
    const completedOrder = await this.orderRepository.completeOrder(
      orderId,
      UserId
    );

    return completedOrder;
  };
}
