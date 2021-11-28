const router = require("express").Router();
const { police_check, verifyToken } = require("../../middlewares");
const deliverAddressController = require("./controller");

router.get(
  "/delivery-addresses",
  verifyToken,
  police_check("read", "DeliveryAddress"),
  deliverAddressController.index
);

router.post(
  "/delivery-addresses",
  verifyToken,
  police_check("create", "DeliveryAddress"),
  deliverAddressController.store
);

router.put(
  "/delivery-addresses/:id",
  verifyToken,
  deliverAddressController.update
);
router.delete(
  "/delivery-addresses/:id",
  verifyToken,
  deliverAddressController.destroy
);

module.exports = router;
