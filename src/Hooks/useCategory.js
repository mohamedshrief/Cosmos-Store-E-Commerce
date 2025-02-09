import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategory() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const res = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
  return res;
}
