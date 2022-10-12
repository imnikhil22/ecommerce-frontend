import axios from "axios";
import { herokuDomain, localDomain } from "./ProductApis";

export const getProductReviews = async ({ queryKey }) => {
  console.log("triggered", queryKey[1]);
  const { data } = await axios.get(`${localDomain}/api/review/${queryKey[1]}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("google-oauth-token"),
    },
  });
  console.log("product :", data);
  return data;
};

export const addProductReview = ({ id: productId, review }) => {
  const data = axios.post(`${localDomain}/api/review/${productId}`, review, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("google-oauth-token"),
    },
  });
  return data;
};
