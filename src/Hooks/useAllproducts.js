import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useAllproducts() {
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const getAllProductsResponse = useQuery({
    queryKey: ["AllProducts"],
    queryFn: getAllProducts,
  });
  return getAllProductsResponse;
}
