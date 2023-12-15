import { prisma } from "../utils/prisma/index.js";

const auth_owner_middleware = async (req, res, next) => {
  try {
    console.log("----미들웨어------");
    const { userId } = res.locals.user;
    const { restaurantId } = req.params;
    // console.log("restaurantId: ", +restaurantId);

    const owner = await prisma.restaurants.findUnique({
      where: {
        UserId: userId,
      },
    });
    // console.log("owner: ", owner);
    console.log("----미들웨어------");
    if (!owner) {
      return res.status(401).json({
        success: false,
        message: "권한이 없습니다 (사장 등록 X)",
      });
    }
    if (owner.restaurantId !== +restaurantId) {
      return res.status(401).json({
        success: false,
        message: "권한이 없습니다(사장 등록 O, 다른 사장 페이지)",
      });
    }
    res.locals.owner = owner;
    next();
  } catch (error) {
    res.clearCookie("authorization");
    return res.status(401).json({
      message: "비정상적인 요청입니다.",
    });
  }
};

export { auth_owner_middleware };
