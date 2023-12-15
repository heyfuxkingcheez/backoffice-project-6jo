import { OrderService } from "../services/order.service.js";

export class OrderController {
  orderService = new OrderService();
  // 잔고 확인
  checkPoint = async (req, res, next) => {
    const { userId } = res.locals.user;
    await this.orderService.checkPoint(userId);
  };

  // 주문 결제
  orderPayment = async (req, res, next) => {
    const { MenuId, orderDetails, totalPrice } = await req.body;
    const { userId } = res.locals.user;
    const { restaurantId } = req.params;
    console.log("userId: ", userId);

    const orderPayment = await this.orderService.orderPayment(
      userId,
      MenuId,
      restaurantId,
      orderDetails,
      totalPrice
    );
    console.log("orderPayment: ", orderPayment);

    return res.status(200).json({
      success: true,
      message: "주문 성공!",
      data: orderPayment,
    });
  };

  // 주문 조회 API (사장)
  getOrders = async (req, res, next) => {
    const { restaurantId } = req.params;
    console.log("restaurantId: ", restaurantId);

    const getOrders = await this.orderService.getOrders(restaurantId);

    return res.status(200).json({
      success: true,
      message: "주문 목록 조회 성공",
      data: getOrders,
    });
  };

  // 배달 완료 API (사장)
  completeOrder = async (req, res, next) => {
    const { orderId } = req.params;

    const completedOrder = await this.orderService.completeOrder(orderId);

    return res.status(200).json({
      success: true,
      message: "배달 완료! 정산되었습니다.",
      data: completedOrder,
    });
  };
}
