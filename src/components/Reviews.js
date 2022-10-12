import React from "react";
import "../styles/Reviews.css";

export const Reviews = ({ reviewsData }) => {
  return (
    <div className="reviews-align-box">
      <h1 className="reviews-header">Reviews</h1>
      {reviewsData.ratings.length ? (
        reviewsData.ratings.map((customer) => (
          <div className="rating" key={customer.id}>
            <div className="rating-set">
              <h4>CustomerName : </h4>
              <p>{customer.name}</p>
            </div>
            <div className="rating-set">
              <h4>Review : </h4>
              <p>{customer.review}</p>
            </div>
            <div className="rating-set">
              <h4>Rating : </h4>
              <p>{String.fromCharCode(11088).repeat(customer.rating)}</p>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <h1>No ratings for this product yet!</h1>
      )}
    </div>
  );
};
