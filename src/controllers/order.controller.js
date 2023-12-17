import { OrderService } from "../services/order.service.js";

export class OrderController {
  orderService = new OrderService();

  // 잔고 확인
  checkPoint = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      await this.orderService.checkPoint(userId);
    } catch (err) {
      next(err);
    }
  };

  // 주문 결제
  orderPayment = async (req, res, next) => {
    try {
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
    } catch (err) {
      next(err);
    }
  };

  // 주문 조회 API (사장)
  getOrders = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      console.log("restaurantId: ", restaurantId);

      const getOrders = await this.orderService.getOrders(restaurantId);
      console.log("주문조회 컨트롤러어어어어어어ㅓ어어어", getOrders);

      return res.status(200).json({
        success: true,
        message: "주문 목록 조회 성공",
        data: getOrders,
      });
    } catch (err) {
      next(err);
    }
  };

  // 배달 완료 API (사장)
  completeOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { UserId } = res.locals.owner;
      console.log("UserId 주인장 id: ", UserId);

      const completedOrder = await this.orderService.completeOrder(
        orderId,
        UserId
      );

      return res.status(200).json({
        success: true,
        message: "배달 완료! 정산되었습니다.",
        data: completedOrder,
      });
    } catch (err) {
      next(err);
    }
  };
}
