const router = require("express").Router();

const {
  getAllProducts,
  getProductById,
  postProductById,
} = require("../controllers/productControllers");

router.get("/", getAllProducts);

router.get("/:productId", getProductById);

router.post("/create", postProductById);

module.exports = router;
