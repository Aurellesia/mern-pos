const router = require("express").Router();
const invoiceController = require("./controller");
const { police_check, verifyToken } = require("../../middlewares");

router.get(
  "/invoice/:order_id",
  verifyToken,
  police_check("read", "Invoice"),
  invoiceController.show
);

module.exports = router;
