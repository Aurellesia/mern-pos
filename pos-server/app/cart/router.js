const router = require("express").Router();
const cartController = require("./controller");
const { police_check, verifyToken } = require("../../middlewares");

router.put(
  "/carts",
  verifyToken,
  police_check("update", "Cart"),
  cartController.update
);

router.get(
  "/carts",
  verifyToken,
  police_check("read", "Cart"),
  cartController.index
);

module.exports = router;
