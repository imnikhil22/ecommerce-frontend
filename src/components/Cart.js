import React from "react";
import { useCart } from "../store/cartState";
import "../styles/Cart.css";

export const Cart = () => {
  const [cart] = useCart();
  console.log(cart);
  const products = Object.keys(cart);

  if (products.length === 0) {
    return <h1 className="cart-modal">No items added into the cart yet!</h1>;
  } else
    return (
      <div className="cart-modal">
        {products.map((productId) => (
          <div key={productId} className={"cart-item"}>
            <img
              src={cart[productId].image}
              alt={cart[productId].description}
            />
            <div className="item-info">
              <h4>{cart[productId].name}</h4>
              <p>{cart[productId].description}</p>
              <p>{cart[productId].totalPrice}</p>
              <p>{cart[productId].quantity}</p>
            </div>
          </div>
        ))}
      </div>
    );
};
