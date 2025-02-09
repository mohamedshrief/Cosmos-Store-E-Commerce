import useCategory from "../../Hooks/useCategory";
import SolarSystemSpinner from "../SolarSystemSpinner/SolarSystemSpinner";
import { useContext } from "react";
import ChosenCaregoryDisplay from "../ChosenCaregoryDisplay/ChosenCaregoryDisplay";
import { categoryContext } from "../../CategoryContext/CategoryContext";
import NotFound404 from "../NotFound404/NotFound404";

export default function Categories() {
  const { selectedCategory, handleChosenCategoryId } =
    useContext(categoryContext);

  const { data, isError, error, isLoading } = useCategory();
  const allCategories = data?.data.data;

  return (
    <>
      <div id="category" className="py-10">
        <div className="categories-titels flex flex-wrap justify-center items-center">
          {isLoading && <SolarSystemSpinner />}
          {isError && <NotFound404 />}
          {allCategories?.map((categoty) => {
            return (
              <button
                key={categoty._id}
                onClick={() => handleChosenCategoryId(categoty._id)}
                type="button"
                className={
                  categoty._id == selectedCategory
                    ? "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    : "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-3 mb-3"
                }
              >
                {categoty.name}
              </button>
            );
          })}
        </div>
        <div className="categoryDisplay">
          <div className="sectiontitel"></div>
          <div className="category-content grid gap-6 p-6 grid-cols-2 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3">
            {selectedCategory && (
              <ChosenCaregoryDisplay selectedCategory={selectedCategory} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
