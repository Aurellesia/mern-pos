const router = require("express").Router();
const tagController = require("./controller");
const { police_check, verifyToken } = require("../../middlewares");

router.get(
  "/tags",
  verifyToken,
  police_check("read", "Tag"),
  tagController.index
);
router.post(
  "/tags",
  verifyToken,
  police_check("create", "Tag"),
  tagController.store
);
router.put(
  "/tags/:id",
  verifyToken,
  police_check("update", "Tag"),
  tagController.update
);
router.delete(
  "/tags/:id",
  verifyToken,
  police_check("delete", "Tag"),
  tagController.destroy
);

module.exports = router;
