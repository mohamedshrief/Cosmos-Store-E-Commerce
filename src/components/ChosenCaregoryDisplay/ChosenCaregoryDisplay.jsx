import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SolarSystemSpinner from "../SolarSystemSpinner/SolarSystemSpinner";
import useAllproducts from "../../Hooks/useAllproducts";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard/ProductCard";
import NotFound404 from "../NotFound404/NotFound404";

export default function ChosenCaregoryDisplay({ selectedCategory }) {
  function getSpecificCategory() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${selectedCategory}`
    );
  }
  const categoryRes = useQuery({
    queryKey: [`getChosenCategory ${selectedCategory}`],
    queryFn: getSpecificCategory, // إرجاع قيمة فارغة عند عدم تحديد فئة
  });

  // ------------------------------------------------------------------------
  //   get all products func
  const allProductsData = useAllproducts();
  console.log("allProductsData", allProductsData.data?.data.data);
  //   ------------------------------------------------------------------------

  const ChosenCategory = categoryRes.data?.data.data;

  if (categoryRes.isLoading || allProductsData.isLoading) {
    return <SolarSystemSpinner />;
  }
  if (categoryRes.isError || allProductsData.isError) {
    return <NotFound404 />;
  }

  if (ChosenCategory) {
    const filteredProducts = allProductsData.data?.data.data.filter(
      (product) => product.category.name === ChosenCategory.name
    );
    if (filteredProducts.length === 0) {
      return (
        <div className="text-center flex justify-center items-center text-white font-bold text-4xl py-8 col-span-2 md:col-span-3 lg:col-span-5">
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
              filter: "blur(10px)",
              rotate: -30, // دوران مبدئي
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              rotate: 0, // دوران طبيعي بعد الدخول
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            style={{
              boxShadow: "0px 0px 30px rgba(0, 150, 255, 0.8)", // تأثير توهج
              padding: "10px",
              width: "fit-content",
            }}
          >
            <p>No products found in this category.</p>
          </motion.div>
        </div>
      );
    }

    return (
      <>
        {filteredProducts.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </>
    );
  }
}
