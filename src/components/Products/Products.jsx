import useAllproducts from "../../Hooks/useAllproducts";
import ProductCard from "../ProductCard/ProductCard";
import SolarSystemSpinner from "./../SolarSystemSpinner/SolarSystemSpinner";

export default function Products() {
  const { data, isError, error, isLoading, isFetching } = useAllproducts();

  const allProducts = data?.data.data;
  if (isLoading) {
    return <SolarSystemSpinner />;
  }

  return (
    <div className="">
      <div className="container mx-auto p-6">
        <div className="content grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {allProducts?.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
