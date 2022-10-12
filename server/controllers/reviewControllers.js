const { PrismaClient } = require("@prisma/client");
const { review } = new PrismaClient();

const getReviewsById = async (req, res) => {
  const { productId } = req.params;
  const data = await review.findMany({
    select: {
      id: true,
      name: true,
      review: true,
      rating: true,
      productId: true,
    },
    where: {
      productId: Number(productId),
    },
  });
  console.log("product :", data);
  res.status(200).json({ ratings: data });
};

const postReviewByProductId = async (req, res) => {
  const { productId } = req.params;
  const data = await review.create({
    data: { ...req.body, productId: Number(productId) },
  });
  res.status(200).json(data);
};

module.exports = { getReviewsById, postReviewByProductId };
