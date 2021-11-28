const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const { police_check, verifyToken } = require("../../middlewares");

const productContoller = require("./controller");

router.get(
  "/products",
  police_check("read", "Product"),
  productContoller.index
);

router.post(
  "/products",
  multer({ dest: os.tmpdir() }).single("image"),
  verifyToken,
  police_check("create", "Product"),
  productContoller.store
);

router.put(
  "/products/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  verifyToken,
  police_check("update", "Product"),
  productContoller.update
);
router.delete(
  "/products/:id",
  verifyToken,
  police_check("delete", "Product"),
  productContoller.destroy
);

module.exports = router;
