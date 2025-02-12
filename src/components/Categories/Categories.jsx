import useCategory from "../../Hooks/useCategory";
import SolarSystemSpinner from "../SolarSystemSpinner/SolarSystemSpinner";
import { useContext } from "react";
import ChosenCaregoryDisplay from "../ChosenCaregoryDisplay/ChosenCaregoryDisplay";
import { categoryContext } from "../../CategoryContext/CategoryContext";
import NotFound404 from "../NotFound404/NotFound404";
import { Zoom } from "react-awesome-reveal";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";

export default function Categories() {
  const { selectedCategory, handleChosenCategoryId } =
    useContext(categoryContext);

  const { data, isError, isLoading } = useCategory();
  const allCategories = data?.data.data;
  if (isLoading) {
    return <SolarSystemSpinner />;
  }
  if (isError) {
    return <NotFound404 />;
  }
  return (
    <div id="category" className="py-10">
      <div className="container mx-auto p-6">
        <div className="content grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {allCategories?.map((categoty) => {
            return (
              <Zoom delay={100} duration={1500} triggerOnce key={categoty._id}>
                <div className="block rounded-lg group relative px-4 pt-4 shadow-sm bg-white shadow-stone-100">
                  <div className="img h-[350px]">
                    <img
                      alt={categoty?.name}
                      src={categoty?.image}
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                  <h3 className="text-center text-xl rounded-md font-bold bg-gray-300">
                    {categoty?.name}
                  </h3>
                  <div className="overlay  absolute w-full h-full top-0 left-0 rounded-lg z-20 bg-gray-500 opacity-30"></div>
                  <div className="overlay  absolute w-full h-full top-0 left-0 rounded-lg z-30 opacity-0 group-hover:opacity-100 duration-300 mt-12">
                    <SeeMoreButton
                      id={categoty._id}
                      newPath={`/categoryProductsDisplay/${categoty._id}`}
                    />
                  </div>
                </div>
              </Zoom>
            );
          })}
        </div>
      </div>
    </div>
  );
}
