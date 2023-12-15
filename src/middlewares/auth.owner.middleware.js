import { prisma } from "../utils/prisma/index.js";

const auth_owner_middleware = async (req, res, next) => {
  try {
    const { userId } = res.locals.user;
    console.log(userId);
    next();
  } catch (err) {}
};

export { auth_owner_middleware };
