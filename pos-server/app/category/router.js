const router = require("express").Router();
const categoryController = require("./controller");
const { police_check, verifyToken } = require("../../middlewares");

router.get(
  "/categories",
  verifyToken,
  police_check("read", "Category"),
  categoryController.index
);
router.post(
  "/categories",
  verifyToken,
  police_check("create", "Category"),
  categoryController.store
);
router.put(
  "/categories/:id",
  verifyToken,
  police_check("update", "Category"),
  categoryController.update
);
router.delete(
  "/categories/:id",
  verifyToken,
  police_check("delete", "Category"),
  categoryController.destroy
);

module.exports = router;
