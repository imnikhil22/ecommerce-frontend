const { PrismaClient } = require("@prisma/client");
const { default: axios } = require("axios");
const { product } = new PrismaClient();

const getAllProducts = async () => {
  const { data } = await axios.get(
    `https://obscure-refuge-62167.herokuapp.com/products`
  );

  data.forEach(async (item) => {
    const { name, description, image, category, quantity, price, variants } =
      item;
    let {
      data: { ratings },
    } = await axios.get(
      `https://obscure-refuge-62167.herokuapp.com/products/${item.id}/reviews`
    );
    // console.log(ratings);
    ratings = ratings.map((rating) => {
      let newRating = { ...rating };
      delete newRating.id;
      delete newRating.product_id;
      return newRating;
    });
    // console.log(ratings);
    const productItem = await product.create({
      data: {
        name,
        description,
        image,
        category,
        quantity,
        price,
        variants,
        ratings: {
          create: ratings,
        },
      },
    });
    // console.log(productItem);
  });
};

getAllProducts();
