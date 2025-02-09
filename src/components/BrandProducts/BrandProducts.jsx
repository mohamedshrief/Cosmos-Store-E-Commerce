import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SolarSystemSpinner from "../SolarSystemSpinner/SolarSystemSpinner";
import useAllproducts from "../../Hooks/useAllproducts";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import NotFound404 from "../NotFound404/NotFound404";

export default function BrandProducts() {
  // ------------------------------------------------------------------------
  //   get all products func
  const allProductsRes = useAllproducts();
  const allProductsData = allProductsRes.data?.data.data;
  //   console.log("allProductsData", allProductsData);
  //   ------------------------------------------------------------------------
  const { id: chosenBrandID } = useParams();

  function getSpecificBrand() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${chosenBrandID}`
    );
  }

  const brandRes = useQuery({
    queryKey: [`getChosenBrand ${chosenBrandID}`],
    queryFn: getSpecificBrand, // إرجاع قيمة فارغة عند عدم تحديد فئة
  });

  const chosenBrandData = brandRes.data?.data.data;

  const filteredBrandProducts = allProductsData?.filter(
    (product) => product.brand && product.brand.name === chosenBrandData.name
  );
  if (brandRes.isLoading || allProductsRes.isLoading) {
    return <SolarSystemSpinner />;
  }
  if (brandRes.isError || allProductsRes.isError) {
    return <NotFound404 />;
  }

  if (!brandRes.data?.data.data || !allProductsRes.data?.data.data) {
    return <SolarSystemSpinner />;
  }
  if (filteredBrandProducts) {
    if (
      !brandRes.isLoading &&
      !allProductsRes.isLoading &&
      filteredBrandProducts.length === 0
    ) {
      return (
        <div className="text-center h-[500px] flex justify-center items-center text-white font-bold text-4xl py-8 col-span-2 md:col-span-3 lg:col-span-5">
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
            <p>No products found in this Brand.</p>
          </motion.div>
          {/* <p>No products found in this category.</p> */}
        </div>
      );
    }
    return (
      <>
        <div className="category-content grid gap-6 p-6 grid-cols-2 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3">
          {filteredBrandProducts.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </>
    );
  }
}
