import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../components/ProductCard";
import "../styles/Home.css";
import { getAllProducts } from "../apis/ProductApis";

export const Home = () => {
  const { isLoading, error, isError, data } = useQuery(
    ["home-products"],
    getAllProducts
  );

  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <div className="header">
        <h1>Products</h1>
        <button>Create Product</button>
      </div>
      <div className="content">
        {data.map((product) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            key={product.id}
            to={`/product/${product.id}`}
          >
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </Link>
        ))}
        {/* {data.map((product) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            key={product.id}
            to={`/product/${product.id}`}
          >
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </Link>
        ))}
        {data.map((product) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            key={product.id}
            to={`/product/${product.id}`}
          >
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </Link>
        ))} */}
      </div>
    </>
  );
};
