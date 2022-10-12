const { PrismaClient } = require("@prisma/client");
const { product } = new PrismaClient();

const getAllProducts = async (req, res) => {
  const data = await product.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      description: true,
      image: true,
      category: true,
      quantity: true,
      price: true,
      variants: true,
    },
  });
  res.status(200).json(data);
};

const getProductById = async (req, res) => {
  let { productId } = req.params;
  console.log(productId);
  const data = await product.findUnique({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      description: true,
      image: true,
      category: true,
      quantity: true,
      price: true,
      variants: true,
    },
    where: {
      id: Number(productId),
    },
  });
  console.log(data);
  res.status(200).json(data);
};

const postProductById = async (req, res) => {
  const { body } = req;
  if (
    !(
      body.name &&
      body.description &&
      body.image &&
      body.category &&
      body.quantity !== undefined &&
      body.price
    )
  ) {
    res.status(300).json({ msg: "some of the fields are missing" });
  }
  try {
    let data;
    if (body.ratings) {
      data = await product.create({
        data: { ...body },
      });
    } else {
      data = await product.create({
        data: { ...body, ratings: {} },
      });
    }
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(303).json({ msg: "something wrong with the server" });
  }
};

module.exports = { getAllProducts, getProductById, postProductById };
