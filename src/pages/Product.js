import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCart } from "../store/cartState";
import { getProduct } from "../apis/ProductApis";
import { getProductReviews } from "../apis/ReviewsApi";
import { Reviews } from "../components/Reviews";
import { ReviewForm } from "../components/ReviewForm";
import "../styles/Product.css";

export const Product = () => {
  const [cart, setCart] = useCart();
  const [img, setImg] = useState("");
  const [itemsInStock, setItemsInStock] = useState(0);
  const params = useParams();
  const { id } = params;
  const key = [`reviews`, id];

  const {
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
    data: productData,
  } = useQuery([`product`, id], getProduct);

  const {
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
    data: reviewsData,
  } = useQuery(key, getProductReviews);

  useEffect(() => {
    if (productData && !img) {
      const { image, quantity } = productData;
      setImg(image);
      cart[id]
        ? setItemsInStock(quantity - cart[id].quantity)
        : setItemsInStock(quantity);
    }
  }, [cart, productData, id, img]);

  const handleVariantChange = (image) => {
    setImg(image);
  };

  const addToCart = () => {
    if (!cart[productData.id]) {
      setCart((prevCart) => {
        let newCart = {
          ...prevCart,

          [productData.id]: {
            image: productData.image,
            name: productData.name,
            price: productData.price,
            description: productData.description,
            totalPrice: productData.price,
            quantity: 1,
          },
        };
        return newCart;
      });
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        [productData.id]: {
          ...prevCart[productData.id],
          totalPrice:
            (prevCart[productData.id].quantity + 1) *
            prevCart[productData.id].price,
          quantity: prevCart[productData.id].quantity + 1,
        },
      }));
    }
    setItemsInStock((prevItemsInStock) => prevItemsInStock - 1);
  };

  const removeFromCart = () => {
    cart[productData.id].quantity === 1
      ? setCart((prevCart) => {
          let newCart = { ...prevCart };
          delete newCart[productData.id];
          return newCart;
        })
      : setCart((prevCart) => ({
          ...prevCart,
          [productData.id]: {
            ...prevCart[productData.id],
            totalPrice: prevCart[productData.id].totalPrice - productData.price,
            quantity: prevCart[productData.id].quantity - 1,
          },
        }));
    setItemsInStock((prevItemsInStock) => prevItemsInStock + 1);
  };

  const displayStockStatus = () => {
    return itemsInStock === 0
      ? `Unavailable`
      : itemsInStock > 10
      ? "Available"
      : `Selling Fast`;
  };

  if (isProductLoading || isReviewsLoading) {
    return <h1>Loading..</h1>;
  }
  if (isProductError || isReviewsError) {
    return (
      <h1>
        {productError.message} && {reviewsError.message}
      </h1>
    );
  }

  return (
    <>
      <div className="container">
        <div className="product-container">
          <div className="bottle-img">
            <img src={img} alt={productData.description} />
          </div>
          <div className="bottle-info">
            <h2>{productData.name}</h2>
            <p>{productData.description}</p>
            <p>
              Price : <span className="price-text">$ {productData.price}</span>
            </p>
            <p>{displayStockStatus()}</p>
            <div className="variants-color">
              {productData.variants?.map((variant, idx) => (
                <div
                  key={idx}
                  className="button"
                  style={{ backgroundColor: variant.color }}
                  onClick={(e) => {
                    handleVariantChange(variant.image);
                  }}
                ></div>
              ))}
            </div>
            {!cart[productData.id] ? (
              <button onClick={(e) => addToCart()}>Add to Cart</button>
            ) : (
              <div>
                <button
                  disabled={!cart[productData.id].quantity}
                  onClick={(e) => removeFromCart()}
                >
                  -
                </button>
                {cart[productData.id].quantity}
                <button disabled={!itemsInStock} onClick={(e) => addToCart()}>
                  +
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="reviews-container">
          <Reviews reviewsData={reviewsData} />
          <ReviewForm id={productData.id} key={key} />
        </div>
      </div>
    </>
  );
};
