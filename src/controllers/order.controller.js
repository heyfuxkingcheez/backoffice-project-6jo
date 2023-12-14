import { OrderService } from "../services/order.service.js";

export class OrderController {
  orderService = new OrderService();
  // 잔고 확인
  checkPoint = async (req, res, next) => {
    const { userId } = res.locals.user;
    await this.orderService.checkPoint(userId);
  };

  // 주문 생성
  createOrder = async (req, res, next) => {
    const { MenuId, orderDetails, totalPrice } = await req.body;
    const { userId } = res.locals.user;

    const createdOrder = await this.orderService.createOrder(
      userId,
      MenuId,
      orderDetails,
      totalPrice
    );
    return res
      .status(200)
      .json({ success: true, message: "주문 성공!", data: createdOrder });
  };
}
