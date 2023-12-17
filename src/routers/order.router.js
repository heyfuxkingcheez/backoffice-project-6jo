import { Router } from "express";
import { auth_middleware } from "../middlewares/auth.middleware.js";
import { OrderController } from "../controllers/order.controller.js";
import { auth_owner_middleware } from "../middlewares/auth.owner.middleware.js";

const orderRouter = Router();
const orderController = new OrderController();

// 주문 생성 API (고객)
orderRouter.post(
  "/:restaurantId/order",
  auth_middleware,
  orderController.orderPayment
);
//  주문 조회 API (사장)
orderRouter.get(
  "/:restaurantId/order",
  auth_middleware,
  // auth_owner_middleware,
  orderController.getOrders
);
// // 주문 상태 수정 API(배달 완료) (사장)
orderRouter.patch(
  "/:restaurantId/order/:orderId",
  auth_middleware,
  auth_owner_middleware,
  orderController.completeOrder
);

export { orderRouter };
