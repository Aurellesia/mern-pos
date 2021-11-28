const router = require("express").Router();
const orderController = require("./controller");
const { police_check, verifyToken } = require("../../middlewares");

router.post(
  "/orders",
  verifyToken,
  police_check("create", "Order"),
  orderController.store
);

router.get(
  "/orders",
  verifyToken,
  police_check("read", "Order"),
  orderController.index
);

module.exports = router;
