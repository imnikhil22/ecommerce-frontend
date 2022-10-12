const router = require("express").Router();

const {
  getReviewsById,
  postReviewByProductId,
} = require("../controllers/reviewControllers");

router.get("/:productId", getReviewsById);

router.post("/:productId", postReviewByProductId);

module.exports = router;
