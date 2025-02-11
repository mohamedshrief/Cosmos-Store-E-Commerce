import React from "react";
import SolarSystemSpinner from "./../SolarSystemSpinner/SolarSystemSpinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";
import NotFound404 from "../NotFound404/NotFound404";
import { Zoom } from "react-awesome-reveal";

export default function AllBrands() {
  function getAllBrabds() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["AllProducts"],
    queryFn: getAllBrabds,
  });

  const allBrandsData = data?.data.data;

  if (isLoading) {
    return <SolarSystemSpinner />;
  }

  if (isError) {
    isError && <NotFound404 />;
  }

  return (
    <Zoom delay={100} duration={1500} className="">
      <div className="container mx-auto p-6">
        <div className="content grid grid-cols-2 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {allBrandsData?.map((brand) => {
            return (
              <div
                key={brand._id}
                className="block rounded-lg group relative p-4 shadow-sm bg-white shadow-stone-100"
              >
                <div className="img">
                  <img
                    alt={brand.name}
                    src={brand.image}
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>
                <div className="overlay  absolute w-full h-full top-0 left-0 rounded-lg z-20 bg-gray-500 opacity-30"></div>
                <div className="overlay  absolute w-full h-full top-0 left-0 rounded-lg z-30 opacity-0 group-hover:opacity-100 duration-300 mt-12">
                  <SeeMoreButton
                    id={brand._id}
                    newPath={`brandProducts/${brand._id}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Zoom>
  );
}
